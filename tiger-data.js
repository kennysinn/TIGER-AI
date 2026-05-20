(function () {
  const TEMPLATE_DATA = {
    speed: {
      template_key: "speed",
      company_name: "Speed-to-Lead AI Company",
      company_type: "Speed-to-Lead AI Company",
      problem: "Businesses lose leads because replies are too slow.",
      target_customer: "SMEs that receive enquiries from WhatsApp, forms, ads, or social inboxes",
      service_type: "Fast enquiry response, lead qualification, and sales handover",
      primary_language: "English + Mandarin + Malay",
      pricing_direction: "Setup RM1,500-RM3,000 + monthly RM300-RM800",
      result_promised: "Faster replies, fewer lost leads, and cleaner sales handover.",
      handover_rule: "Hand over hot leads, urgent requests, and cases with missing pricing or booking details.",
      description: "A one-person AI service company that helps businesses respond to new enquiries quickly and prepare clean sales handovers.",
      employees: ["AI First Responder", "AI Lead Qualifier", "AI Sales Handover Assistant", "AI Hot Lead Detector", "AI Appointment Setter"],
      knowledge: ["FAQ", "product or service details", "pricing", "booking rules", "handover contact", "service area"],
      servicePackage: "AI Speed-to-Lead Assistant with first response flow, qualification questions, hot lead signals, and sales handover summary.",
      proposalOutline: "Slow response cost, proposed enquiry flow, AI employee roles, handover process, setup timeline, and monthly optimization.",
      whatsappScript: "Hi, I help businesses reply to new enquiries faster, qualify leads, and send clean handover notes to sales. Want to see a demo?",
      onboardingForm: "Business hours, services, pricing rules, booking rules, service area, sales contact, and common customer questions.",
      monthlyReport: "New leads, qualified leads, hot leads, average response time, handover count, and missing information."
    },
    documents: {
      template_key: "documents",
      company_name: "Document Processing AI Company",
      company_type: "Document Processing AI Company",
      problem: "Businesses waste hours processing invoices, forms, orders, quotation requests, and admin documents.",
      target_customer: "Admin-heavy SMEs, wholesalers, clinics, logistics teams, and service companies",
      service_type: "Document reading, data extraction, error checking, and structured output",
      primary_language: "English + Mandarin + Malay",
      pricing_direction: "Setup RM2,000-RM4,000 + monthly by document volume",
      result_promised: "Less manual data entry, fewer errors, and faster admin workflow.",
      handover_rule: "Hand over documents with unclear totals, missing fields, or conflicting customer information.",
      description: "A one-person AI service company that helps businesses turn messy documents and requests into structured working data.",
      employees: ["AI Document Reader", "AI Data Extractor", "AI Order Structurer", "AI Error Checker", "AI Admin Entry Assistant"],
      knowledge: ["sample invoices", "quotation format", "order rules", "required fields", "error examples", "export format"],
      servicePackage: "AI Document Processing Assistant with extraction fields, missing info checks, and structured admin output.",
      proposalOutline: "Manual admin bottleneck, document types, extraction workflow, error checks, output format, and monthly processing report.",
      whatsappScript: "Hi, I help teams reduce manual document entry by extracting invoice, order, and quotation details into structured data.",
      onboardingForm: "Document samples, required fields, approval rules, output format, error examples, and monthly volume.",
      monthlyReport: "Documents processed, hours saved, missing fields, error checks, and pending items."
    },
    followup: {
      template_key: "followup",
      company_name: "Follow-up Engine AI Company",
      company_type: "Follow-up Engine AI Company",
      problem: "Businesses lose deals because nobody follows up consistently after enquiry, quotation, demo, meeting, or webinar.",
      target_customer: "Sales teams, consultants, education centres, service providers, and high-ticket businesses",
      service_type: "Lead follow-up, quotation reminders, next-step prompts, and sales scripts",
      primary_language: "English + Mandarin",
      pricing_direction: "Setup RM1,500-RM3,500 + monthly RM500-RM1,500",
      result_promised: "Recovered leads, better follow-up discipline, and more proposal opportunities.",
      handover_rule: "Hand over hot replies, objections, appointment requests, and customers asking for final pricing.",
      description: "A one-person AI service company that helps businesses continue conversations after the first enquiry or quotation.",
      employees: ["AI Follow-up Manager", "AI Quotation Follow-up Assistant", "AI Sales Reminder Assistant", "AI Objection Handler"],
      knowledge: ["lead stages", "quotation details", "follow-up timing", "sales objections", "offer details", "handover owner"],
      servicePackage: "AI Follow-up Recovery System with 1-day, 3-day, and 7-day reminders, sales scripts, and lead status tracking.",
      proposalOutline: "Lost follow-up problem, lead stages, recommended sequence, scripts, handover rules, and performance reporting.",
      whatsappScript: "Hi, I help businesses follow up with leads and quotations consistently so good opportunities do not disappear.",
      onboardingForm: "Lead sources, quotation process, offer details, follow-up timing, objection list, and sales owner.",
      monthlyReport: "Follow-ups sent, replies, reactivated leads, proposal requests, won leads, and stuck opportunities."
    },
    reactivation: {
      template_key: "reactivation",
      company_name: "Customer Reactivation AI Company",
      company_type: "Customer Reactivation AI Company",
      problem: "Businesses have old leads, old customers, or old enquiries that are not being used.",
      target_customer: "Businesses with old WhatsApp enquiries, customer lists, past buyers, or dormant leads",
      service_type: "Old lead sorting, customer segmentation, reactivation scripts, and response classification",
      primary_language: "English + Mandarin",
      pricing_direction: "Audit RM800-RM2,000 + campaign fee + monthly retainer",
      result_promised: "Recover customer opportunities without increasing ad spend.",
      handover_rule: "Hand over warm replies, buying signals, complaints, and requests for updated offers.",
      description: "A one-person AI service company that helps businesses reactivate old customer lists and recover dormant opportunities.",
      employees: ["AI Old Lead Scanner", "AI Reactivation Message Writer", "AI Customer Segmenter", "AI Campaign Assistant", "AI Response Classifier"],
      knowledge: ["old lead source", "customer segments", "past offers", "new offer", "message rules", "response categories"],
      servicePackage: "AI Lost Lead Recovery Campaign with database audit, segmentation, message drafts, and response classification.",
      proposalOutline: "Unused customer asset, segmentation method, reactivation campaign, message examples, handover flow, and report.",
      whatsappScript: "Hi, I help businesses turn old customer lists and old enquiries into fresh conversations with a structured reactivation campaign.",
      onboardingForm: "Old lead list, past purchase details, customer segments, new offer, message approval, and follow-up owner.",
      monthlyReport: "Contacts activated, responses, warm leads, hot leads, blocked contacts, and estimated recovered value."
    },
    reporting: {
      template_key: "reporting",
      company_name: "Business Reporting AI Company",
      company_type: "Business Reporting AI Company",
      problem: "Bosses do not know daily business status, enquiry progress, sales follow-up gaps, or team performance.",
      target_customer: "Owners and managers who need daily visibility across leads, sales activity, and follow-up gaps",
      service_type: "Daily reports, sales visibility, task summary, performance signals, and management alerts",
      primary_language: "English + Mandarin + Malay",
      pricing_direction: "Monthly reporting retainer from RM500-RM1,500",
      result_promised: "Daily visibility, better management, and less dependency on manual updates.",
      handover_rule: "Alert the owner when hot leads are stuck, follow-up is missed, or key numbers change.",
      description: "A one-person AI service company that helps owners see what is happening without chasing manual updates every day.",
      employees: ["AI Daily Report Assistant", "AI Sales Visibility Assistant", "AI Performance Analyst", "AI Task Summary Assistant", "AI Management Alert Assistant"],
      knowledge: ["lead fields", "sales stages", "report format", "alert rules", "team owners", "daily targets"],
      servicePackage: "AI Daily Business Report System with daily summary, follow-up gap report, hot lead list, and management alerts.",
      proposalOutline: "Visibility gap, reporting inputs, daily summary format, alert rules, management workflow, and monthly review.",
      whatsappScript: "Hi, I help owners get daily visibility on enquiries, follow-up gaps, and sales activity without manual chasing.",
      onboardingForm: "Lead sources, sales stages, staff owners, report timing, alert rules, and monthly targets.",
      monthlyReport: "Lead count, follow-up rate, hot leads, pending actions, team visibility, and missed follow-ups."
    }
  };

  const LEGACY_TEMPLATE_MAP = {
    admin: "documents",
    support: "speed",
    content: "reporting",
    sales: "followup"
  };

  const getTemplate = (templateKey) => {
    return TEMPLATE_DATA[templateKey] || TEMPLATE_DATA[LEGACY_TEMPLATE_MAP[templateKey]] || TEMPLATE_DATA.speed;
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

    const template = getTemplate(templateKey);
    const { data, error } = await auth.client
      .from("ai_companies")
      .insert({
        template_key: template.template_key,
        company_name: template.company_name,
        company_type: template.company_type,
        target_customer: template.target_customer,
        service_type: template.service_type,
        primary_language: template.primary_language,
        pricing_direction: template.pricing_direction,
        description: template.description,
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
        const templateKey = button.dataset.template || "speed";
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

    const template = getTemplate(data.template_key);
    document.querySelectorAll("[data-template-problem]").forEach((target) => {
      target.textContent = template.problem;
    });
    document.querySelectorAll("[data-result-promised]").forEach((target) => {
      target.textContent = template.result_promised;
      if ("value" in target) {
        target.value = template.result_promised;
      }
    });
    document.querySelectorAll("[data-handover-rule]").forEach((target) => {
      target.textContent = template.handover_rule;
      if ("value" in target) {
        target.value = template.handover_rule;
      }
    });
    document.querySelectorAll("[data-template-employees]").forEach((target) => {
      target.innerHTML = template.employees.map((employee) => `<span>${employee}</span>`).join("");
    });
    document.querySelectorAll("[data-template-knowledge]").forEach((target) => {
      target.innerHTML = template.knowledge.map((item) => `<li>${item}</li>`).join("");
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
          <p>${getTemplate(company.template_key).result_promised}</p>
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

  window.TigerTemplates = TEMPLATE_DATA;
  init();
})();
