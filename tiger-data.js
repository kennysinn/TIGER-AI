(function () {
  const TEMPLATE_DATA = {
    admin: {
      template_key: "admin",
      company_name: "AI Admin Company",
      company_type: "AI Admin Company",
      target_customer: "SME owners and operators",
      service_type: "Admin replies, quotation support, and follow-up",
      primary_language: "English + Mandarin + Malay",
      pricing_direction: "Starter retainer from RM299/month",
      description: "A practical AI admin service for customer replies, quotation drafts, and simple operations support."
    },
    support: {
      template_key: "support",
      company_name: "AI Customer Support Company",
      company_type: "AI Customer Support Company",
      target_customer: "Local businesses with repeat customer questions",
      service_type: "FAQ automation, lead qualification, and human handover",
      primary_language: "English + Mandarin + Malay",
      pricing_direction: "Support package from RM399/month",
      description: "An AI customer support service that helps businesses answer common questions and collect lead details."
    },
    content: {
      template_key: "content",
      company_name: "AI Content Agency",
      company_type: "AI Content Agency",
      target_customer: "Consultants, trainers, coaches, and agencies",
      service_type: "Research, writing, and content repurposing",
      primary_language: "English first",
      pricing_direction: "Monthly content package from RM599/month",
      description: "An AI-assisted content service for research, drafting, and turning ideas into reusable content assets."
    },
    sales: {
      template_key: "sales",
      company_name: "AI Sales Follow-up Company",
      company_type: "AI Sales Follow-up Company",
      target_customer: "Consultants and SMEs with active leads",
      service_type: "Lead follow-up, proposal reminders, and client handover",
      primary_language: "English + Mandarin",
      pricing_direction: "Follow-up package from RM499/month",
      description: "An AI sales follow-up service that helps teams respond faster and keep proposal conversations moving."
    }
  };

  const requireTigerAuth = () => {
    if (!window.TigerAuth) {
      throw new Error("Supabase auth is not loaded.");
    }
    return window.TigerAuth;
  };

  const setDataStatus = (message) => {
    document.querySelectorAll("[data-data-status]").forEach((target) => {
      target.textContent = message || "";
      target.hidden = !message;
    });
  };

  const getCurrentFile = () => {
    return window.location.pathname.split("/").pop() || "index.html";
  };

  const createCompany = async (templateKey) => {
    const auth = requireTigerAuth();
    const user = await auth.getUser();

    if (!user) {
      localStorage.setItem("tiger-ai-pending-template", templateKey);
      window.location.href = `login.html?next=${encodeURIComponent("templates.html")}`;
      return null;
    }

    await auth.ensureProfile(user);

    const template = TEMPLATE_DATA[templateKey] || TEMPLATE_DATA.admin;
    const { data, error } = await auth.client
      .from("ai_companies")
      .insert({
        ...template,
        user_id: user.id,
        status: "draft"
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const bindTemplateCreation = async () => {
    const templateButtons = document.querySelectorAll("[data-template]");

    templateButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        const templateKey = button.dataset.template || "admin";
        localStorage.setItem("tiger-ai-template", templateKey);
        setDataStatus("Creating your AI company...");

        try {
          const company = await createCompany(templateKey);
          if (company) {
            localStorage.removeItem("tiger-ai-pending-template");
            window.location.href = `builder.html?company_id=${encodeURIComponent(company.id)}`;
          }
        } catch (error) {
          setDataStatus(error.message);
        }
      });
    });

    const pendingTemplate = localStorage.getItem("tiger-ai-pending-template");
    if (pendingTemplate && getCurrentFile() === "templates.html") {
      setDataStatus("Finishing your AI company setup...");
      try {
        const company = await createCompany(pendingTemplate);
        if (company) {
          localStorage.removeItem("tiger-ai-pending-template");
          window.location.href = `builder.html?company_id=${encodeURIComponent(company.id)}`;
        }
      } catch (error) {
        setDataStatus(error.message);
      }
    }
  };

  const getCompanyId = () => {
    return new URLSearchParams(window.location.search).get("company_id");
  };

  const loadBuilderCompany = async () => {
    const companyId = getCompanyId();
    if (!companyId) {
      setDataStatus("Choose a template to create an AI company first.");
      return;
    }

    const auth = requireTigerAuth();
    const user = await auth.getUser();
    if (!user) {
      return;
    }

    const { data, error } = await auth.client
      .from("ai_companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      setDataStatus(error.message);
      return;
    }

    document.querySelectorAll("[data-company-name]").forEach((target) => {
      target.textContent = data.company_name;
    });
    document.querySelectorAll("[data-company-type]").forEach((target) => {
      target.textContent = data.company_type;
    });

    const form = document.querySelector("[data-company-form]");
    if (!form) {
      return;
    }

    form.company_name.value = data.company_name || "";
    form.target_customer.value = data.target_customer || "";
    form.service_type.value = data.service_type || "";
    form.primary_language.value = data.primary_language || "";
    form.pricing_direction.value = data.pricing_direction || "";
    form.description.value = data.description || "";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setDataStatus("Saving company...");

      const { error: updateError } = await auth.client
        .from("ai_companies")
        .update({
          company_name: form.company_name.value.trim(),
          target_customer: form.target_customer.value.trim(),
          service_type: form.service_type.value.trim(),
          primary_language: form.primary_language.value.trim(),
          pricing_direction: form.pricing_direction.value.trim(),
          description: form.description.value.trim()
        })
        .eq("id", companyId);

      if (updateError) {
        setDataStatus(updateError.message);
        return;
      }

      document.querySelectorAll("[data-company-name]").forEach((target) => {
        target.textContent = form.company_name.value.trim();
      });
      setDataStatus("Company saved.");
    });
  };

  const renderCompanyList = (companies) => {
    const list = document.querySelector("[data-company-list]");
    if (!list) {
      return;
    }

    if (!companies.length) {
      list.innerHTML = `
        <div class="empty-state">
          <h3>You have not created an AI company yet.</h3>
          <p>Choose a template to start.</p>
          <a class="primary-button" href="templates.html">Choose a template</a>
        </div>
      `;
      return;
    }

    list.innerHTML = companies.map((company) => `
      <article class="company-item">
        <div>
          <span class="template-code">${company.status || "draft"}</span>
          <h3>${company.company_name}</h3>
          <p>${company.company_type}</p>
        </div>
        <a class="secondary-button" href="builder.html?company_id=${encodeURIComponent(company.id)}">Open</a>
      </article>
    `).join("");
  };

  const loadUserDashboard = async () => {
    const auth = requireTigerAuth();
    const user = await auth.getUser();
    if (!user) {
      return;
    }

    const { data, error } = await auth.client
      .from("ai_companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setDataStatus(error.message);
      return;
    }

    const companies = data || [];
    document.querySelectorAll("[data-company-count]").forEach((target) => {
      target.textContent = String(companies.length);
    });
    renderCompanyList(companies);
  };

  const init = async () => {
    if (!window.TigerAuth) {
      return;
    }

    const page = getCurrentFile();

    if (page === "templates.html") {
      await bindTemplateCreation();
    }

    if (page === "builder.html") {
      await loadBuilderCompany();
    }

    if (page === "user-dashboard.html") {
      await loadUserDashboard();
    }
  };

  init();
})();
