const navLinks = document.querySelectorAll(".main-nav a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  const isDashboardPage = currentPage.includes("dashboard") && href === "public-dashboard.html";
  if (href === currentPage || isDashboardPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});

const templateButtons = document.querySelectorAll("[data-template]");

templateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.setItem("tiger-ai-template", button.dataset.template);
  });
});

const chosenTemplate = localStorage.getItem("tiger-ai-template");
const templateName = document.querySelector("[data-template-name]");

if (templateName && chosenTemplate) {
  const names = {
    speed: "Speed-to-Lead AI Company",
    documents: "Document Processing AI Company",
    followup: "Follow-up Engine AI Company",
    reactivation: "Customer Reactivation AI Company",
    reporting: "Business Reporting AI Company"
  };
  templateName.textContent = names[chosenTemplate] || names.speed;
}

const loginForm = document.querySelector("[data-login-form]");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const roleSelect = loginForm.querySelector("[data-login-role]");

    if (roleSelect && roleSelect.value) {
      window.location.href = roleSelect.value;
      return;
    }

    const status = document.querySelector("[data-login-status]");
    if (status) {
      status.textContent = "Workspace access preview only. Real signup will be added in the full MVP.";
    }
  });
}

const painInput = document.querySelector("[data-pain-input]");
const generateCompanyButton = document.querySelector("[data-generate-company]");
const painChoiceButtons = document.querySelectorAll("[data-pain-choice]");

const generatedCompany = {
  slow: {
    pain: "My target customers lose leads because replies are too slow.",
    name: "Speed-to-Lead AI Company",
    employees: ["AI First Responder", "AI Lead Qualifier", "AI Sales Handover Assistant"],
    package: "AI Enquiry Response System",
    pricing: "Setup RM1,500-RM3,000<br>Monthly RM500-RM1,500",
    demo: "tiger.ai/demo/speed-to-lead",
    metrics: ["Response time", "Qualified leads", "Handover count", "Missed leads"]
  },
  docs: {
    pain: "My target customers waste too much time processing documents manually.",
    name: "Document Processing AI Company",
    employees: ["AI Document Reader", "AI Data Extractor", "AI Error Checker"],
    package: "AI Document Processing System",
    pricing: "Setup RM2,000-RM4,000<br>Monthly by document volume",
    demo: "tiger.ai/demo/document-processing",
    metrics: ["Documents processed", "Hours saved", "Errors detected", "Missing fields"]
  },
  followup: {
    pain: "My target customers lose deals because sales follow-up is inconsistent.",
    name: "Follow-up Engine AI Company",
    employees: ["AI Follow-up Manager", "AI Quotation Follow-up Assistant", "AI Objection Handler"],
    package: "AI Follow-up Recovery System",
    pricing: "Setup RM1,500-RM3,500<br>Monthly RM500-RM1,500",
    demo: "tiger.ai/demo/follow-up-engine",
    metrics: ["Follow-ups sent", "Replies", "Reactivated leads", "Proposal requests"]
  },
  reactivate: {
    pain: "My target customers have old leads and customer lists that are not being used.",
    name: "Customer Reactivation AI Company",
    employees: ["AI Old Lead Scanner", "AI Reactivation Message Writer", "AI Response Classifier"],
    package: "AI Lost Lead Recovery Campaign",
    pricing: "Audit RM800-RM2,000<br>Monthly campaign retainer",
    demo: "tiger.ai/demo/customer-reactivation",
    metrics: ["Contacts activated", "Warm replies", "Hot leads", "Recovered opportunities"]
  },
  report: {
    pain: "My target customers cannot see daily business status clearly.",
    name: "Business Reporting AI Company",
    employees: ["AI Daily Report Assistant", "AI Sales Visibility Assistant", "AI Management Alert Assistant"],
    package: "AI Daily Business Report System",
    pricing: "Setup RM1,000-RM2,500<br>Monthly RM500-RM1,500",
    demo: "tiger.ai/demo/business-reporting",
    metrics: ["Lead count", "Follow-up rate", "Pending actions", "Team visibility"]
  }
};

const renderGeneratedCompany = (key) => {
  const output = generatedCompany[key] || generatedCompany.slow;
  const name = document.querySelector("[data-generated-name]");
  const employees = document.querySelector("[data-generated-employees]");
  const servicePackage = document.querySelector("[data-generated-package]");
  const pricing = document.querySelector("[data-generated-pricing]");
  const demo = document.querySelector("[data-generated-demo]");
  const metrics = document.querySelector("[data-generated-metrics]");

  if (name) name.textContent = output.name;
  if (employees) employees.innerHTML = output.employees.map((item) => `<li>${item}</li>`).join("");
  if (servicePackage) servicePackage.textContent = output.package;
  if (pricing) pricing.innerHTML = output.pricing;
  if (demo) demo.textContent = output.demo;
  if (metrics) metrics.innerHTML = output.metrics.map((item) => `<span>${item}</span>`).join("");
};

const detectPainKey = () => {
  const value = (painInput?.value || "").toLowerCase();
  if (value.includes("document") || value.includes("invoice") || value.includes("form") || value.includes("order")) return "docs";
  if (value.includes("follow") || value.includes("quotation") || value.includes("quote")) return "followup";
  if (value.includes("old") || value.includes("reactivat") || value.includes("database") || value.includes("customer list")) return "reactivate";
  if (value.includes("report") || value.includes("visibility") || value.includes("status")) return "report";
  return "slow";
};

painChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.painChoice || "slow";
    if (painInput) {
      painInput.value = generatedCompany[key].pain;
    }
    renderGeneratedCompany(key);
  });
});

generateCompanyButton?.addEventListener("click", () => {
  renderGeneratedCompany(detectPainKey());
});
