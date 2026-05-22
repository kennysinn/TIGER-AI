(function () {
  const SUPABASE_URL = "https://frtvuwslnuuwcgqwszra.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ZRcnmOC6x-9TNP2ULMZtCg_LTbc1r3t";

  if (!window.supabase) {
    return;
  }

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  const page = document.body.dataset.authPage;
  const requiredRole = document.body.dataset.authRequired;
  const ALLOWED_NEXT_PAGES = new Set([
    "user-dashboard.html",
    "admin-dashboard.html",
    "public-dashboard.html",
    "templates.html",
    "builder.html",
    "demo.html"
  ]);

  const translate = (message) => {
    return window.TigerI18n?.translate(message) || message;
  };

  const setStatus = (message) => {
    const status = document.querySelector("[data-auth-status]");
    if (status) {
      status.textContent = translate(message);
    }
  };

  const setAuthError = (message) => {
    document.querySelectorAll("[data-auth-error]").forEach((target) => {
      target.textContent = translate(message) || "";
      target.hidden = !message;
    });
  };

  const profilePayloadFor = (user) => {
    return {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
      role: "user",
      plan: "free",
      account_status: "active"
    };
  };

  const ensureProfile = async (user) => {
    if (!user) {
      return null;
    }

    const { data, error } = await client
      .from("profiles")
      .select("id,email,full_name,role,plan,account_status")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }

    const { data: created, error: createError } = await client
      .from("profiles")
      .upsert(profilePayloadFor(user), { onConflict: "id" })
      .select("id,email,full_name,role,plan,account_status")
      .single();

    if (createError) {
      throw createError;
    }

    return created;
  };

  const isAdminProfile = (profile) => {
    return profile?.role === "admin" && profile?.account_status === "active";
  };

  const dashboardFor = (profile) => {
    return isAdminProfile(profile) ? "admin-dashboard.html" : "user-dashboard.html";
  };

  const getNextPage = () => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    return ALLOWED_NEXT_PAGES.has(next) ? next : "";
  };

  const routeAfterAuth = async (user) => {
    const next = getNextPage();
    let profile;

    try {
      profile = await ensureProfile(user);
    } catch (error) {
      setStatus(`Profile setup failed: ${error.message}`);
      return;
    }

    if (next === "admin-dashboard.html" && !isAdminProfile(profile)) {
      window.location.href = "user-dashboard.html";
      return;
    }

    window.location.href = next || dashboardFor(profile);
  };

  const updateAccountUi = (user, profile) => {
    document.querySelectorAll("[data-account-email]").forEach((target) => {
      target.textContent = user?.email || translate("Not signed in");
    });

    document.querySelectorAll("[data-account-role]").forEach((target) => {
      target.textContent = translate(profile?.role || "guest");
    });

    document.querySelectorAll("[data-account-plan]").forEach((target) => {
      target.textContent = translate(profile?.plan || "free");
    });
  };

  const getRedirectTo = () => {
    const path = window.location.pathname.replace(/\/[^/]*$/, "/login.html");
    return `${window.location.origin}${path}`;
  };

  const getResetRedirectTo = () => {
    const path = window.location.pathname.replace(/\/[^/]*$/, "/reset-password.html");
    return `${window.location.origin}${path}`;
  };

  const routeIfNeeded = async () => {
    const { data } = await client.auth.getSession();
    const user = data.session?.user;
    let profile = null;

    if (user) {
      try {
        profile = await ensureProfile(user);
        setAuthError("");
      } catch (error) {
        setAuthError(`Database setup needed: ${error.message}`);
      }
    }

    updateAccountUi(user, profile);

    if (page === "login" && user) {
      await routeAfterAuth(user);
      return;
    }

    if (!requiredRole) {
      return;
    }

    if (!user) {
      window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname.split("/").pop())}`;
      return;
    }

    if (requiredRole === "admin" && !isAdminProfile(profile)) {
      window.location.href = "user-dashboard.html";
    }
  };

  const bindAuthForm = () => {
    const form = document.querySelector("[data-auth-form]");
    if (!form) {
      return;
    }

    const emailInput = form.querySelector("[data-auth-email]");
    const passwordInput = form.querySelector("[data-auth-password]");
    const signupButton = form.querySelector("[data-auth-signup]");
    const resetButton = form.querySelector("[data-auth-reset]");
    const googleButton = document.querySelector("[data-auth-google]");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setStatus("Signing in...");

      const { data, error } = await client.auth.signInWithPassword({
        email: emailInput.value.trim(),
        password: passwordInput.value
      });

      if (error) {
        setStatus(error.message);
        return;
      }

      await routeAfterAuth(data.user);
    });

    signupButton?.addEventListener("click", async () => {
      setStatus("Creating account...");

      const { data, error } = await client.auth.signUp({
        email: emailInput.value.trim(),
        password: passwordInput.value,
        options: {
          emailRedirectTo: getRedirectTo()
        }
      });

      if (error) {
        setStatus(error.message);
        return;
      }

      if (data.session?.user) {
        await routeAfterAuth(data.session.user);
        return;
      }

      setStatus("Account created. Check your email if confirmation is enabled.");
    });

    resetButton?.addEventListener("click", async () => {
      const email = emailInput.value.trim();

      if (!email) {
        setStatus("Enter your email first, then click forgot password.");
        return;
      }

      setStatus("Sending password reset email...");

      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: getResetRedirectTo()
      });

      if (error) {
        setStatus(error.message);
        return;
      }

      setStatus("Password reset email sent. Check your inbox.");
    });

    googleButton?.addEventListener("click", async () => {
      setStatus("Opening Google login...");

      const { error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getRedirectTo()
        }
      });

      if (error) {
        setStatus(error.message);
      }
    });
  };

  const bindResetPasswordForm = () => {
    const form = document.querySelector("[data-reset-form]");
    if (!form) {
      return;
    }

    const passwordInput = form.querySelector("[data-reset-password]");
    const confirmInput = form.querySelector("[data-reset-confirm]");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setStatus("Updating password...");

      if (passwordInput.value.length < 8) {
        setStatus("Use at least 8 characters for the new password.");
        return;
      }

      if (passwordInput.value !== confirmInput.value) {
        setStatus("Passwords do not match.");
        return;
      }

      const { data } = await client.auth.getSession();
      if (!data.session?.user) {
        setStatus("Reset session not found. Open the latest password reset link from your email.");
        return;
      }

      const { error } = await client.auth.updateUser({
        password: passwordInput.value
      });

      if (error) {
        setStatus(error.message);
        return;
      }

      setStatus("Password updated. Redirecting to login...");
      await client.auth.signOut();
      window.setTimeout(() => {
        window.location.href = "login.html";
      }, 900);
    });
  };

  const bindLogout = () => {
    document.querySelectorAll("[data-auth-logout]").forEach((button) => {
      button.addEventListener("click", async () => {
        await client.auth.signOut();
        window.location.href = "public-dashboard.html";
      });
    });
  };

  client.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      updateAccountUi(null, null);
      return;
    }

    ensureProfile(session.user)
      .then((profile) => updateAccountUi(session.user, profile))
      .catch((error) => setAuthError(error.message));
  });

  window.TigerAuth = {
    client,
    ensureProfile,
    getSession: () => client.auth.getSession(),
    getUser: async () => {
      const { data } = await client.auth.getSession();
      return data.session?.user || null;
    },
    getProfile: async () => {
      const { data } = await client.auth.getSession();
      return data.session?.user ? ensureProfile(data.session.user) : null;
    },
    isAdminProfile,
    dashboardFor
  };

  bindAuthForm();
  bindResetPasswordForm();
  bindLogout();
  routeIfNeeded();
})();
