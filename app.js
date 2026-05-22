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
  if (currentLanguage === "zh") {
    applyLanguage("zh");
  }
};

const detectPainKey = () => {
  const value = (painInput?.value || "").toLowerCase();
  if (value.includes("document") || value.includes("invoice") || value.includes("form") || value.includes("order") || value.includes("文件") || value.includes("订单")) return "docs";
  if (value.includes("follow") || value.includes("quotation") || value.includes("quote") || value.includes("跟进") || value.includes("报价")) return "followup";
  if (value.includes("old") || value.includes("reactivat") || value.includes("database") || value.includes("customer list") || value.includes("旧") || value.includes("名单")) return "reactivate";
  if (value.includes("report") || value.includes("visibility") || value.includes("status") || value.includes("报告") || value.includes("状态")) return "report";
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

const languageText = {
  "Home": "首页",
  "Templates": "模板",
  "Builder": "生成器",
  "Demo Link": "演示链接",
  "Dashboard": "仪表盘",
  "Pricing": "价格",
  "Log in": "登录",
  "Start building": "开始建立",
  "AI Company Builder Platform": "AI 公司生成平台",
  "Build your AI company. Train your AI employees.": "建立你的 AI 公司。训练你的 AI 员工。",
  "Start with a real business pain. Tiger AI creates the AI employees, service package, demo link, and operating dashboard around it.": "从真实商业痛点开始。Tiger AI 会围绕这个痛点生成 AI 员工、服务配套、演示链接和运营仪表盘。",
  "Generate my AI company": "生成我的 AI 公司",
  "View client demo link": "查看客户演示链接",
  "AI company": "AI 公司",
  "not a blank assistant": "不是空白助手",
  "Demo link": "演示链接",
  "share with prospects": "发给潜在客户看",
  "MRR-ready": "适合月费经营",
  "subscription business focus": "订阅制业务导向",
  "Speed-to-Lead AI Company Command Center": "Speed-to-Lead AI 公司控制台",
  "Company Builder": "公司生成器",
  "Employee Studio": "员工工作室",
  "Knowledge Trainer": "知识训练器",
  "Business Kit": "商业工具包",
  "AI Employee": "AI 员工",
  "First Responder for SME enquiries": "中小企业询盘第一回应员",
  "Replies fast, qualifies leads, collects missing details, and hands over hot enquiries.": "快速回复、判断客户意向、收集缺失资料，并把高意向询盘交给销售。",
  "Knowledge coverage": "知识覆盖率",
  "Answer accuracy": "回答准确度",
  "Template": "模板",
  "Train": "训练",
  "Demo": "演示",
  "Operate": "运营",
  "Pain-to-Company Generator": "痛点到 AI 公司生成器",
  "Choose a business pain. Tiger AI forms the AI company around it.": "选择一个商业痛点。Tiger AI 围绕它生成一间 AI 公司。",
  "Every AI employee becomes a sellable service package, not just an experiment.": "每个 AI 员工都会变成可销售的服务配套，而不只是实验。",
  "Business pain input": "商业痛点输入",
  "Describe the pain": "描述痛点",
  "My target customers lose leads because replies are too slow.": "我的目标客户因为回复太慢而流失询盘。",
  "Slow replies": "回复太慢",
  "Manual documents": "文件处理太手工",
  "Missed follow-ups": "跟进经常漏掉",
  "Sleeping database": "沉睡客户名单",
  "No visibility": "老板看不到状态",
  "Generated AI Company": "生成的 AI 公司",
  "SIMULATED OUTPUT": "静态模拟结果",
  "Recommended AI Employees": "推荐 AI 员工",
  "AI First Responder": "AI 第一回应员",
  "AI Lead Qualifier": "AI 客户筛选员",
  "AI Sales Handover Assistant": "AI 销售交接助理",
  "AI Document Reader": "AI 文件读取员",
  "AI Data Extractor": "AI 资料抽取员",
  "AI Error Checker": "AI 错误检查员",
  "AI Follow-up Manager": "AI 跟进经理",
  "AI Quotation Follow-up Assistant": "AI 报价跟进助理",
  "AI Objection Handler": "AI 异议处理员",
  "AI Old Lead Scanner": "AI 旧线索扫描员",
  "AI Reactivation Message Writer": "AI 重新激活话术员",
  "AI Response Classifier": "AI 回复分类员",
  "AI Daily Report Assistant": "AI 每日报告助理",
  "AI Sales Visibility Assistant": "AI 销售可视化助理",
  "AI Management Alert Assistant": "AI 管理提醒助理",
  "Service Package": "服务配套",
  "AI Enquiry Response System": "AI 询盘回应系统",
  "AI Document Processing System": "AI 文件处理系统",
  "AI Follow-up Recovery System": "AI 跟进追回系统",
  "AI Lost Lead Recovery Campaign": "AI 旧线索追回活动",
  "AI Daily Business Report System": "AI 每日业务报告系统",
  "Pricing Suggestion": "价格建议",
  "Setup RM1,500-RM3,000": "设置费 RM1,500-RM3,000",
  "Setup RM2,000-RM4,000": "设置费 RM2,000-RM4,000",
  "Setup RM1,500-RM3,500": "设置费 RM1,500-RM3,500",
  "Setup RM1,000-RM2,500": "设置费 RM1,000-RM2,500",
  "Audit RM800-RM2,000": "审查费 RM800-RM2,000",
  "Monthly RM500-RM1,500": "月费 RM500-RM1,500",
  "Monthly by document volume": "按文件数量计算月费",
  "Monthly campaign retainer": "月费活动 retainer",
  "Business Kit": "商业工具包",
  "Proposal outline": "Proposal 大纲",
  "WhatsApp outreach script": "WhatsApp 开发话术",
  "Client onboarding form": "客户 onboarding 表格",
  "Monthly report template": "月报模板",
  "Monthly Report Metrics": "月报指标",
  "Response time": "回复速度",
  "Qualified leads": "合格询盘",
  "Handover count": "交接数量",
  "Missed leads": "漏掉询盘",
  "Documents processed": "已处理文件",
  "Hours saved": "节省工时",
  "Errors detected": "发现错误",
  "Missing fields": "缺失字段",
  "Follow-ups sent": "已发送跟进",
  "Replies": "客户回复",
  "Reactivated leads": "重新激活线索",
  "Proposal requests": "Proposal 请求",
  "Contacts activated": "已激活联系人",
  "Warm replies": "温热回复",
  "Hot leads": "高意向线索",
  "Recovered opportunities": "追回机会",
  "Lead count": "线索数量",
  "Follow-up rate": "跟进率",
  "Pending actions": "待处理行动",
  "Team visibility": "团队可视化",
  "My target customers waste too much time processing documents manually.": "我的目标客户花太多时间手动处理文件。",
  "My target customers lose deals because sales follow-up is inconsistent.": "我的目标客户因为销售跟进不稳定而流失成交。",
  "My target customers have old leads and customer lists that are not being used.": "我的目标客户有旧线索和客户名单，但没有被使用。",
  "My target customers cannot see daily business status clearly.": "我的目标客户看不清每天的业务状态。",
  "Start from this pain": "从这个痛点开始",
  "Build this company": "建立这间公司",
  "Business pain templates": "商业痛点模板",
  "Build an AI company around real business pain.": "围绕真实商业痛点建立 AI 公司。",
  "Tiger AI does not just create AI assistants. It helps users package AI employees into a sellable one-person AI company.": "Tiger AI 不只是创建 AI 助手，而是帮助用户把 AI 员工包装成可销售的一人 AI 公司。",
  "Speed-to-Lead AI Company": "Speed-to-Lead AI 公司",
  "Document Processing AI Company": "文件处理 AI 公司",
  "Follow-up Engine AI Company": "跟进引擎 AI 公司",
  "Customer Reactivation AI Company": "旧客户激活 AI 公司",
  "Business Reporting AI Company": "业务报告 AI 公司",
  "How it works": "如何运作",
  "From AI employee to AI business.": "从 AI 员工到 AI 生意。",
  "Build once. Share demos. Track leads.": "建立一次。分享演示。追踪线索。",
  "Choose an AI company template": "选择 AI 公司模板",
  "Pick a ready business direction.": "选择一个现成的业务方向。",
  "Train your first AI employee": "训练第一个 AI 员工",
  "Upload knowledge and test replies.": "上传知识并测试回复。",
  "Generate client-ready demos": "生成客户可看的演示",
  "Create a shareable sales asset.": "生成可分享的销售资产。",
  "Operate recurring revenue": "经营 recurring revenue",
  "Track leads and MRR targets.": "追踪线索和 MRR 目标。",
  "Who it is for": "适合谁",
  "For people turning AI skill into a service business.": "适合想把 AI 能力变成服务生意的人。",
  "For builders who want structure, not another blank tool.": "适合想要系统结构，而不是又一个空白工具的人。",
  "Freelancers": "自由工作者",
  "Package service offers faster.": "更快包装服务配套。",
  "Consultants": "顾问",
  "Turn expertise into demos.": "把专业能力变成演示。",
  "Marketing agencies": "营销 agency",
  "Add AI packages to sales.": "把 AI 配套加入销售。",
  "Trainers and coaches": "讲师和教练",
  "Show practical AI outcomes.": "展示实际 AI 成果。",
  "Solopreneurs": "一人创业者",
  "Build with a clear path.": "用清晰路径开始建立。",
  "New AI service founders": "AI 服务创业者",
  "Start with a business system.": "从商业系统开始。",
  "Pricing preview": "价格预览",
  "Suggested subscription pricing.": "建议订阅价格。",
  "Payment is not connected yet. These plans show how the monthly subscription model can be positioned.": "目前还没有连接付款。这些方案先展示月费订阅模式的定位。",
  "Free": "免费",
  "Explore": "探索",
  "Starter": "Starter",
  "Launch first service": "推出第一个服务",
  "Builder": "Builder",
  "Build repeatable offers": "建立可重复销售的服务",
  "Agency": "Agency",
  "Operate client work": "经营客户项目",
  "Try template": "试用模板",
  "Choose Builder": "选择 Builder",
  "Preview dashboard": "预览仪表盘",
  "Build AI Company. Train AI Employees. Launch AI Business.": "建立 AI 公司。训练 AI 员工。启动 AI 生意。",
  "Choose the business problem your AI company will solve.": "选择你的 AI 公司要解决的商业问题。",
  "Each template creates an AI company direction, recommended AI employees, service package, demo flow, and business kit.": "每个模板都会生成 AI 公司方向、推荐 AI 员工、服务配套、演示流程和商业工具包。",
  "Start from a real pain point.": "从真实痛点开始。",
  "Pick the problem a business owner already wants solved.": "选择老板已经愿意解决的问题。",
  "For businesses losing leads because replies are too slow.": "适合因为回复太慢而流失询盘的公司。",
  "AI employees": "AI 员工",
  "First Responder, Lead Qualifier, Sales Handover Assistant.": "第一回应员、客户筛选员、销售交接助理。",
  "Faster enquiry response": "更快回应询盘",
  "Cleaner sales handover": "更清楚的销售交接",
  "Fewer lost leads": "更少询盘流失",
  "For teams wasting hours on invoices, forms, orders, and quotation requests.": "适合每天花很多时间处理 invoice、表格、订单和报价请求的团队。",
  "Document Reader, Data Extractor, Error Checker.": "文件读取员、资料抽取员、错误检查员。",
  "Less manual data entry": "减少人工录入",
  "Fewer admin errors": "减少行政错误",
  "Structured output": "结构化输出",
  "For businesses that lose deals because nobody follows up consistently.": "适合因为没人持续跟进而流失成交的公司。",
  "Follow-up Manager, Quotation Reminder, Objection Handler.": "跟进经理、报价提醒员、异议处理员。",
  "Recovered leads": "追回线索",
  "Better follow-up discipline": "更稳定的跟进纪律",
  "More proposal opportunities": "更多 proposal 机会",
  "For companies with old leads, past customers, or unused enquiry lists.": "适合拥有旧线索、旧客户或未使用询盘名单的公司。",
  "Recover dormant opportunities": "追回沉睡机会",
  "Segment old customer lists": "分类旧客户名单",
  "Generate reactivation messages": "生成重新激活话术",
  "For bosses who want daily visibility on enquiries, follow-up, and team performance.": "适合想每天看清询盘、跟进和团队表现的老板。",
  "Daily business visibility": "每日业务可视化",
  "Follow-up gap alerts": "跟进缺口提醒",
  "Clear management reports": "清楚的管理报告"
};

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
let currentLanguage = localStorage.getItem("tiger-ai-language") || "en";

const translateTextNode = (node, language) => {
  if (!originalTextNodes.has(node)) {
    originalTextNodes.set(node, node.nodeValue);
  }

  const original = originalTextNodes.get(node);
  const trimmed = original.trim();
  if (!trimmed) {
    node.nodeValue = original;
    return;
  }

  const translated = language === "zh" ? languageText[trimmed] : null;
  node.nodeValue = translated ? original.replace(trimmed, translated) : original;
};

const translateAttributes = (element, language) => {
  ["placeholder", "aria-label", "title"].forEach((attribute) => {
    if (!element.hasAttribute(attribute)) {
      return;
    }

    const key = `${attribute}:${element.getAttribute(attribute)}`;
    if (!originalAttributes.has(element)) {
      originalAttributes.set(element, {});
    }

    const saved = originalAttributes.get(element);
    if (!saved[attribute]) {
      saved[attribute] = element.getAttribute(attribute);
    }

    const original = saved[attribute];
    element.setAttribute(attribute, language === "zh" && languageText[original] ? languageText[original] : original);
  });
};

const translatePainInput = (language) => {
  if (!painInput) {
    return;
  }

  Object.values(generatedCompany).forEach((item) => {
    if (language === "zh" && painInput.value === item.pain) {
      painInput.value = languageText[item.pain] || item.pain;
    }
    if (language === "en" && painInput.value === languageText[item.pain]) {
      painInput.value = item.pain;
    }
  });
};

const applyLanguage = (language) => {
  currentLanguage = language;
  localStorage.setItem("tiger-ai-language", language);
  document.documentElement.lang = language === "zh" ? "zh-Hans" : "en";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => translateTextNode(node, language));
  document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => translateAttributes(element, language));
  translatePainInput(language);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.textContent = language === "zh" ? "EN" : "中文";
    button.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
  });
};

const addLanguageToggle = () => {
  document.querySelectorAll(".header-actions").forEach((actions) => {
    if (actions.querySelector("[data-language-toggle]")) {
      return;
    }

    const button = document.createElement("button");
    button.className = "language-toggle";
    button.type = "button";
    button.dataset.languageToggle = "";
    button.addEventListener("click", () => {
      applyLanguage(currentLanguage === "zh" ? "en" : "zh");
    });
    actions.prepend(button);
  });
};

addLanguageToggle();
applyLanguage(currentLanguage);
