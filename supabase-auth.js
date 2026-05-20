(function () {
  const SUPABASE_URL = "https://frtvuwslnuuwcgqwszra.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ZRcnmOC6x-9TNP2ULMZtCg_LTbc1r3t";
  const ADMIN_EMAILS = ["kennysinn21@gmail.com"];

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

  const setStatus = (message) => {
    const status = document.querySelector("[data-auth-status]");
    if (status) {
      status.textContent = message;
    }
  };

  const isAdmin = (user) => {
    return Boolean(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
  };

  const dashboardFor = (user) => {
    return isAdmin(user) ? "admin-dashboard.html" : "user-dashboard.html";
  };

  const getNextPage = () => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    return ALLOWED_NEXT_PAGES.has(next) ? next : "";
  };

  const routeAfterAuth = (user) => {
    const next = getNextPage();

    if (next === "admin-dashboard.html" && !isAdmin(user)) {
      window.location.href = "user-dashboard.html";
      return;
    }

    window.location.href = next || dashboardFor(user);
  };

  const updateAccountUi = (user) => {
    document.querySelectorAll("[data-account-email]").forEach((target) => {
      target.textContent = user?.email || "Not signed in";
    });
  };

  const getRedirectTo = () => {
    const path = window.location.pathname.replace(/\/[^/]*$/, "/login.html");
    return `${window.location.origin}${path}`;
  };

  const routeIfNeeded = async () => {
    const { data } = await client.auth.getSession();
    const user = data.session?.user;

    updateAccountUi(user);

    if (page === "login" && user) {
      routeAfterAuth(user);
      return;
    }

    if (!requiredRole) {
      return;
    }

    if (!user) {
      window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname.split("/").pop())}`;
      return;
    }

    if (requiredRole === "admin" && !isAdmin(user)) {
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

      routeAfterAuth(data.user);
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
        routeAfterAuth(data.session.user);
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
        redirectTo: getRedirectTo()
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

  const bindLogout = () => {
    document.querySelectorAll("[data-auth-logout]").forEach((button) => {
      button.addEventListener("click", async () => {
        await client.auth.signOut();
        window.location.href = "public-dashboard.html";
      });
    });
  };

  client.auth.onAuthStateChange((_event, session) => {
    updateAccountUi(session?.user);
  });

  bindAuthForm();
  bindLogout();
  routeIfNeeded();
})();
