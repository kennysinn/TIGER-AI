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
  "AI Hot Lead Detector": "AI 高意向线索侦测员",
  "AI Appointment Setter": "AI 预约设置员",
  "AI Document Reader": "AI 文件读取员",
  "AI Data Extractor": "AI 资料抽取员",
  "AI Error Checker": "AI 错误检查员",
  "AI Order Structurer": "AI 订单整理员",
  "AI Admin Entry Assistant": "AI 行政录入助理",
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
  "STARTER": "STARTER",
  "BUILDER": "BUILDER",
  "AGENCY": "AGENCY",
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
  "/month": "/月",
  "1 AI employee": "1 个 AI 员工",
  "1 demo link": "1 个演示链接",
  "Limited test messages": "有限测试消息",
  "No business kit export": "不可导出商业工具包",
  "3 AI employees": "3 个 AI 员工",
  "1 AI company profile": "1 个 AI 公司档案",
  "Basic business kit": "基础商业工具包",
  "Client demo link": "客户演示链接",
  "Unlimited AI employees": "无限 AI 员工",
  "Client workspaces": "客户 workspace",
  "White-label demo links": "白标演示链接",
  "Team access and priority support": "团队权限和优先支援",
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

Object.assign(languageText, {
  "Founder Command Desk": "创办人控制台",
  "Founder Command Desk: Speed-to-Lead AI Company": "创办人控制台：Speed-to-Lead AI 公司",
  "Founder Desk": "创办人控制台",
  "Launch your one-person AI company.": "启动你的一人 AI 公司。",
  "Start with a real business pain. Tiger AI forms the AI company, AI employees, service package, demo link, proposal path, and operating dashboard around it.": "从真实商业痛点开始。Tiger AI 会围绕它形成 AI 公司、AI 员工、服务配套、演示链接、proposal 路径和运营仪表盘。",
  "formed from pain": "从痛点形成",
  "Service package": "服务配套",
  "ready to sell": "准备销售",
  "Command Desk": "控制台",
  "control the launch": "掌控启动",
  "Readiness Score": "准备度评分",
  "Pain": "痛点",
  "Company": "公司",
  "Command": "控制台",
  "Founder-in-Command": "创办人掌控",
  "Business gets launched, not just automated.": "启动的是生意，不只是自动化。",
  "Tiger AI gives the founder control over readiness, demos, proposal requests, and MRR direction.": "Tiger AI 让创办人掌控准备度、演示、proposal 请求和 MRR 方向。",
  "Ready to sell": "可销售度",
  "Demo readiness score for the first AI company.": "第一间 AI 公司的演示准备度。",
  "Client signal": "客户信号",
  "Proposal requests waiting for follow-up.": "等待跟进的 proposal 请求。",
  "Founder control": "创办人掌控",
  "Business kit assets prepared for launch.": "已准备启动的商业工具包资产。",
  "MRR path": "MRR 路径",
  "First monthly revenue target to pursue.": "第一个要追的月收入目标。",
  "AI Founder Starter": "AI Founder Starter",
  "Try your first AI company": "试建第一间 AI 公司",
  "AI Company Builder": "AI Company Builder",
  "Build the company shell": "建立 AI 公司骨架",
  "AI Business Operator": "AI Business Operator",
  "Launch and operate offers": "启动并运营服务配套",
  "AI Agency Command Desk": "AI Agency Command Desk",
  "Manage multiple AI companies": "管理多间 AI 公司",
  "Founder Command Desk": "创办人控制台",
  "Control your one-person AI company.": "掌控你的一人 AI 公司。",
  "See which AI company can sell, which demo link got attention, which lead requested a proposal, and what blocks launch readiness.": "看清哪间 AI 公司可以卖、哪个演示链接有人看、哪个线索请求 proposal，以及什么阻碍启动准备度。",
  "In portfolio.": "在组合里。",
  "Ready to Sell": "可销售资产",
  "Assets ready.": "资产已准备。",
  "Shared.": "已分享。",
  "Proposal Requests": "Proposal 请求",
  "Need follow-up.": "需要跟进。",
  "RM0 / RM3k path.": "RM0 / RM3k 路径。",
  "Founder starter.": "创办人起步。",
  "Company portfolio": "公司组合",
  "Founder control": "创办人掌控",
  "What needs attention": "需要注意什么",
  "Pricing rules missing from one demo": "一个演示缺少价格规则",
  "3 proposal requests need follow-up": "3 个 proposal 请求需要跟进",
  "Monthly report template is ready": "月报模板已准备好",
  "MRR target needs first client offer": "MRR 目标需要第一个客户 offer",
  "Business launch kit": "业务启动工具包",
  "Client signal": "客户信号",
  "Founder launch map": "创办人启动地图",
  "From pain point to operating business": "从痛点到可运营业务",
  "Business pain": "商业痛点",
  "AI employees": "AI 员工",
  "Proposal request": "Proposal 请求",
  "MRR dashboard": "MRR 仪表盘",
  "AI Business Operator preview.": "AI Business Operator 方案预览。",
  "Three views for the product flow: public preview, Founder Command Desk, and admin console.": "产品流程有三个视图：公开预览、创办人控制台和管理员控制台。",
  "For registered users controlling AI companies, service packages, demo links, proposal requests, and MRR targets.": "给注册用户掌控 AI 公司、服务配套、演示链接、proposal 请求和 MRR 目标。",
  "View founder desk": "查看创办人控制台",
  "See how Tiger AI helps a business get launched.": "看看 Tiger AI 如何帮助一门业务启动。",
  "Founder Command Desk for leads and MRR": "用于线索和 MRR 的创办人控制台",
  "Back": "返回",
  "My dashboard": "我的仪表盘",
  "Generate demo": "生成演示",
  "Go dashboard": "进入仪表盘",
  "Public view": "公开预览",
  "New company": "新公司",
  "Log out": "登出",
  "Admin": "管理员",
  "Join / Log in": "加入 / 登录",
  "Step 01": "步骤 01",
  "Step 02": "步骤 02",
  "Step 03": "步骤 03",
  "Next: train your first AI employee.": "下一步：训练你的第一个 AI 员工。",
  "You are building:": "你正在建立：",
  "Loading company...": "正在加载公司...",
  "Loading type...": "正在加载类型...",
  "solves:": "解决：",
  "Loading business problem...": "正在加载商业痛点...",
  "01 Template": "01 模板",
  "02 Train": "02 训练",
  "03 Demo": "03 演示",
  "04 Operate": "04 运营",
  "Company Setup": "公司设置",
  "Define the offer around the business pain.": "围绕商业痛点定义服务配套。",
  "Keep the offer clear: who it helps, what result it creates, and when the AI hands over.": "把服务讲清楚：帮谁、创造什么结果、什么时候交给真人。",
  "Company name": "公司名称",
  "Target customer": "目标客户",
  "Service type": "服务类型",
  "Primary language": "主要语言",
  "Result promised": "承诺结果",
  "Handover rule": "交接规则",
  "Pricing direction": "价格方向",
  "Description": "描述",
  "Save AI company": "保存 AI 公司",
  "Recommended AI employee team": "推荐 AI 员工团队",
  "Each pain-point template starts with a small team of AI employees that match the service outcome.": "每个痛点模板都会配一组符合服务结果的 AI 员工。",
  "Readiness Score": "准备度评分",
  "Knowledge trainer checklist": "知识训练清单",
  "Missing information": "缺失资料",
  "Pricing rules, handover contact, report format": "价格规则、交接联系人、报告格式",
  "Demo readiness": "演示准备度",
  "Ready for controlled demo": "可以进行受控演示",
  "Change template": "更换模板",
  "Generate client demo": "生成客户演示",
  "What happens next?": "接下来会发生什么？",
  "Test employee replies": "测试员工回复",
  "Generate business kit": "生成商业工具包",
  "Share demo link": "分享演示链接",
  "Collect proposal request": "收集 proposal 请求",
  "View dashboard": "查看仪表盘",
  "Build around business pain, then package the service.": "围绕商业痛点建立，再包装成服务。",
  "Generate client-ready demos.": "生成客户可看的演示。",
  "This demo link helps your prospect understand the AI service before buying.": "这个演示链接帮助潜在客户在购买前理解 AI 服务。",
  "One-person AI company assets": "一人 AI 公司资产",
  "Build once, share a demo, collect proposal requests.": "建立一次，分享演示，收集 proposal 请求。",
  "A Tiger AI demo link is not a full client portal. It is the prospect-facing sales asset for your AI service package.": "Tiger AI 演示链接不是完整客户后台，而是面向潜在客户的销售资产。",
  "Service package": "服务配套",
  "AI Speed-to-Lead Assistant with response flow, qualification questions, and sales handover summary.": "AI Speed-to-Lead 助手，包含回应流程、筛选问题和销售交接摘要。",
  "Pricing suggestion": "价格建议",
  "Setup RM1,500-RM3,000 plus monthly support from RM300-RM800.": "设置费 RM1,500-RM3,000，加上每月 RM300-RM800 支援费。",
  "Problem, AI system scope, timeline, handover process, and monthly optimization.": "问题、AI 系统范围、时间线、交接流程和每月优化。",
  "WhatsApp outreach": "WhatsApp 开发",
  "A short message to show prospects how the AI employee responds and qualifies leads.": "用简短信件展示 AI 员工如何回应和筛选客户。",
  "FAQ, service details, pricing rules, booking rules, handover contact, and service area.": "FAQ、服务详情、价格规则、预约规则、交接联系人和服务范围。",
  "New leads, qualified leads, hot leads, response speed, handover count, and missing info.": "新询盘、合格询盘、高意向询盘、回应速度、交接数量和缺失资料。",
  "Client sees": "客户看到",
  "What the AI service does": "AI 服务做什么",
  "Example questions to test": "可测试的问题",
  "Request proposal CTA": "请求 proposal 按钮",
  "Founder gets": "创建者获得",
  "Proposal request": "Proposal 请求",
  "Missing knowledge feedback": "缺失知识反馈",
  "Client interest signal": "客户兴趣信号",
  "Follow-up script": "跟进话术",
  "Client Demo": "客户演示",
  "AI Speed-to-Lead Assistant": "AI Speed-to-Lead 助手",
  "See how an AI employee can reply, qualify, and prepare a handover before your sales team steps in.": "看看 AI 员工如何在销售介入前回复、筛选并准备交接。",
  "Can this AI reply to new enquiries quickly?": "这个 AI 可以快速回复新询盘吗？",
  "Yes. It answers common questions, collects customer needs, and flags hot leads for sales handover.": "可以。它会回答常见问题、收集客户需求，并标记高意向询盘给销售。",
  "What information do you need from us?": "你需要我们提供什么资料？",
  "Ready for demo": "演示已准备好",
  "Yes": "是",
  "Example questions: pricing, service area, booking, urgent enquiry": "示例问题：价格、服务范围、预约、紧急询盘",
  "Disclaimer: demo answers depend on approved business knowledge": "免责声明：演示回答取决于已批准的业务知识",
  "Request proposal": "请求 proposal",
  "Next: operate leads, business kits, demo links, and MRR targets.": "下一步：运营线索、商业工具包、演示链接和 MRR 目标。",
  "User dashboard": "用户仪表盘",
  "Operate your AI service business.": "运营你的 AI 服务生意。",
  "Track AI companies, AI employees, demo links, leads, business kits, and MRR target from one workspace.": "在一个 workspace 追踪 AI 公司、AI 员工、演示链接、线索、商业工具包和 MRR 目标。",
  "AI Companies": "AI 公司",
  "Created.": "已创建。",
  "AI Employees": "AI 员工",
  "Template team.": "模板团队。",
  "Demo Links": "演示链接",
  "Leads": "线索",
  "Mock pipeline.": "模拟 pipeline。",
  "MRR Target": "MRR 目标",
  "First client target.": "第一个客户目标。",
  "Plan": "方案",
  "Current.": "当前。",
  "Your AI companies": "你的 AI 公司",
  "Loading companies...": "正在加载公司...",
  "Template employee team": "模板员工团队",
  "AI Hot Lead Detector": "AI 高意向线索侦测员",
  "Business Kits": "商业工具包",
  "Generated service assets": "已生成服务资产",
  "WhatsApp script": "WhatsApp 话术",
  "Onboarding form": "Onboarding 表格",
  "Monthly report": "月报",
  "Demo link pipeline": "演示链接 pipeline",
  "New proposal request - Speed-to-Lead demo": "新 proposal 请求 - Speed-to-Lead 演示",
  "Missing info feedback - pricing rules": "缺失资料反馈 - 价格规则",
  "Follow-up needed - booking workflow": "需要跟进 - 预约流程",
  "Template library": "模板库",
  "Pain-point AI company templates": "痛点型 AI 公司模板",
  "Sleeping customer database": "沉睡客户数据库",
  "Subscription Plan": "订阅方案",
  "Builder plan preview.": "Builder 方案预览。",
  "Payment is not connected yet.": "目前还没有连接付款。",
  "10 AI employees": "10 个 AI 员工",
  "3 AI company profiles": "3 个 AI 公司档案",
  "Proposal and pricing generators": "Proposal 和价格生成器",
  "Client demo links and dashboard": "客户演示链接和仪表盘",
  "Account workspace is available after signup.": "注册后即可使用账号 workspace。",
  "Workspace Login": "Workspace 登录",
  "Log in to Tiger AI.": "登录 Tiger AI。",
  "Email/password and Google login are connected through Supabase.": "Email/password 和 Google 登录已通过 Supabase 连接。",
  "Account Access": "账号访问",
  "Enter your workspace": "进入你的 workspace",
  "Email": "邮箱",
  "Password": "密码",
  "Create account": "创建账号",
  "Continue with Google": "使用 Google 继续",
  "Forgot password?": "忘记密码？",
  "Dashboard routing": "仪表盘路由",
  "Role-based access": "角色权限",
  "Public:": "公开：",
  "visitor preview, no account needed": "访客预览，不需要账号",
  "User:": "用户：",
  "customer workspace after login": "登录后的客户 workspace",
  "Admin:": "管理员：",
  "internal console for approved admin email": "已批准管理员邮箱的内部控制台",
  "Supabase auth is connected. Data saving comes next.": "Supabase Auth 已连接。下一步是保存数据。",
  "Public View": "公开视图",
  "Non-registered user dashboard": "非注册用户仪表盘",
  "See what Tiger AI helps you launch.": "看看 Tiger AI 帮你启动什么。",
  "A public preview for visitors before they create an account.": "访客创建账号前可看的公开预览。",
  "Pain points.": "痛点。",
  "Assets.": "资产。",
  "Access": "访问权限",
  "Public": "公开",
  "No login.": "无需登录。",
  "Next": "下一步",
  "Signup": "注册",
  "Save work.": "保存工作。",
  "Public preview": "公开预览",
  "What visitors can see": "访客可以看到什么",
  "5 pain-point AI company templates": "5 个痛点型 AI 公司模板",
  "Client demo link preview": "客户演示链接预览",
  "Pricing preview": "价格预览",
  "Public product flow": "公开产品流程",
  "Locked after signup": "注册后解锁",
  "What account users get": "账号用户可以获得什么",
  "Saved AI companies": "已保存 AI 公司",
  "Saved AI employees": "已保存 AI 员工",
  "Generated business kits": "已生成商业工具包",
  "Lead and MRR tracking": "线索和 MRR 追踪",
  "Public preview for non-registered visitors.": "给非注册访客看的公开预览。",
  "Admin Overview": "管理员总览",
  "Users": "用户",
  "Plans": "方案",
  "Admin dashboard": "管理员仪表盘",
  "Operate the Tiger AI platform.": "运营 Tiger AI 平台。",
  "For internal operators managing users, templates, plans, leads, and platform status.": "给内部运营者管理用户、模板、方案、线索和平台状态。",
  "Total.": "总数。",
  "Companies": "公司",
  "Employees": "员工",
  "Built.": "已建立。",
  "Shared.": "已分享。",
  "Captured.": "已收集。",
  "User management": "用户管理",
  "Accounts and roles": "账号和角色",
  "Assign role: user or admin": "分配角色：user 或 admin",
  "Review workspace status": "查看 workspace 状态",
  "Monitor signup source": "监控注册来源",
  "Template management": "模板管理",
  "Company template library": "公司模板库",
  "Publish pain-point AI company templates": "发布痛点型 AI 公司模板",
  "Update knowledge checklist": "更新知识清单",
  "Control pricing suggestions": "控制价格建议",
  "Plan controls": "方案控制",
  "Subscription preview": "订阅预览",
  "Free, Starter, Builder, Agency": "Free、Starter、Builder、Agency",
  "Feature limits by plan": "按方案限制功能",
  "Payment connection later": "付款之后再连接",
  "Lead signals": "线索信号",
  "Demo and proposal requests": "演示和 proposal 请求",
  "Track demo views": "追踪演示浏览",
  "Review proposal requests": "查看 proposal 请求",
  "Flag missing knowledge patterns": "标记缺失知识模式",
  "Admin access is protected by Supabase profile role.": "管理员访问由 Supabase profile role 保护。",
  "Password reset": "密码重置",
  "Create a new password.": "创建新密码。",
  "Use the latest reset link from your email, then set a new password for your Tiger AI workspace.": "使用邮箱里的最新重置链接，然后为 Tiger AI workspace 设置新密码。",
  "New password": "新密码",
  "Confirm password": "确认密码",
  "Update password": "更新密码",
  "Back to login": "返回登录",
  "Account access": "账号访问",
  "After reset": "重置后",
  "Log in with your new password": "用新密码登录",
  "Open your user dashboard": "打开用户仪表盘",
  "Continue building your AI company": "继续建立你的 AI 公司",
  "Secure account access for your AI company workspace.": "保护你的 AI 公司 workspace 账号访问。",
  "Checking session...": "正在检查登录状态...",
  "Not signed in": "未登录",
  "guest": "访客",
  "free": "免费",
  "Creating your AI company...": "正在创建你的 AI 公司...",
  "Finishing your AI company setup...": "正在完成 AI 公司设置...",
  "Choose a template to create an AI company first.": "请先选择一个模板来创建 AI 公司。",
  "Saving company...": "正在保存公司...",
  "Company saved.": "公司已保存。",
  "You have not created an AI company yet.": "你还没有创建 AI 公司。",
  "Choose a template to start.": "选择一个模板开始。",
  "Choose a template": "选择模板",
  "Open": "打开",
  "Signing in...": "正在登录...",
  "Creating account...": "正在创建账号...",
  "Account created. Check your email if confirmation is enabled.": "账号已创建。如果开启了邮箱确认，请检查邮箱。",
  "Enter your email first, then click forgot password.": "请先输入邮箱，然后点击忘记密码。",
  "Sending password reset email...": "正在发送密码重置邮件...",
  "Password reset email sent. Check your inbox.": "密码重置邮件已发送，请检查收件箱。",
  "Opening Google login...": "正在打开 Google 登录...",
  "Updating password...": "正在更新密码...",
  "Use at least 8 characters for the new password.": "新密码至少需要 8 个字符。",
  "Passwords do not match.": "两次输入的密码不一致。",
  "Reset session not found. Open the latest password reset link from your email.": "没有找到重置 session。请打开邮箱里的最新密码重置链接。",
  "Password updated. Redirecting to login...": "密码已更新，正在跳转到登录页...",
  "Profile setup failed:": "Profile 设置失败：",
  "Database setup needed:": "需要数据库设置：",
  "Workspace access preview only. Real signup will be added in the full MVP.": "这只是 workspace 访问预览。真实注册会在完整 MVP 中加入。",
  "you@company.com": "you@company.com",
  "Minimum 6 characters": "至少 6 个字符",
  "Speed-to-Lead AI Company": "Speed-to-Lead AI 公司",
  "Businesses lose leads because replies are too slow.": "企业因为回复太慢而流失询盘。",
  "Faster replies, fewer lost leads, and cleaner sales handover.": "更快回复、更少询盘流失、更清楚的销售交接。",
  "Hand over hot leads, urgent requests, and cases with missing pricing or booking details.": "把高意向线索、紧急请求，以及缺少价格或预约资料的情况交给真人。",
  "Document Processing AI Company": "文件处理 AI 公司",
  "Businesses waste hours processing invoices, forms, orders, quotation requests, and admin documents.": "企业每天花很多时间处理 invoice、表格、订单、报价请求和行政文件。",
  "Less manual data entry, fewer errors, and faster admin workflow.": "减少人工录入、减少错误、加快行政流程。",
  "Hand over documents with unclear totals, missing fields, or conflicting customer information.": "把总额不清、字段缺失或客户资料冲突的文件交给真人。",
  "Follow-up Engine AI Company": "跟进引擎 AI 公司",
  "Businesses lose deals because nobody follows up consistently after enquiry, quotation, demo, meeting, or webinar.": "企业因为询盘、报价、演示、会议或 webinar 后没人持续跟进而流失成交。",
  "Recovered leads, better follow-up discipline, and more proposal opportunities.": "追回线索、更稳定的跟进纪律、更多 proposal 机会。",
  "Hand over hot replies, objections, appointment requests, and customers asking for final pricing.": "把高意向回复、异议、预约请求和询问最终价格的客户交给真人。",
  "Customer Reactivation AI Company": "旧客户激活 AI 公司",
  "Businesses have old leads, old customers, or old enquiries that are not being used.": "企业有旧线索、旧客户或旧询盘，但没有被使用。",
  "Recover customer opportunities without increasing ad spend.": "不增加广告费用也能追回客户机会。",
  "Hand over warm replies, buying signals, complaints, and requests for updated offers.": "把温热回复、购买信号、投诉和更新报价请求交给真人。",
  "Business Reporting AI Company": "业务报告 AI 公司",
  "Bosses do not know daily business status, enquiry progress, sales follow-up gaps, or team performance.": "老板看不到每天业务状态、询盘进度、销售跟进缺口或团队表现。",
  "Daily visibility, better management, and less dependency on manual updates.": "每日可视化、更好管理、更少依赖人工汇报。",
  "Alert the owner when hot leads are stuck, follow-up is missed, or key numbers change.": "当高意向线索卡住、跟进漏掉或关键数字变化时提醒老板。",
  "FAQ": "FAQ",
  "product or service details": "产品或服务详情",
  "pricing": "价格",
  "booking rules": "预约规则",
  "handover contact": "交接联系人",
  "service area": "服务范围",
  "sample invoices": "invoice 样本",
  "quotation format": "报价格式",
  "order rules": "订单规则",
  "required fields": "必填字段",
  "error examples": "错误示例",
  "export format": "导出格式",
  "lead stages": "线索阶段",
  "quotation details": "报价详情",
  "follow-up timing": "跟进时间",
  "sales objections": "销售异议",
  "offer details": "配套详情",
  "handover owner": "交接负责人",
  "old lead source": "旧线索来源",
  "customer segments": "客户分类",
  "past offers": "过去配套",
  "new offer": "新配套",
  "message rules": "信息规则",
  "response categories": "回复分类",
  "lead fields": "线索字段",
  "sales stages": "销售阶段",
  "report format": "报告格式",
  "alert rules": "提醒规则",
  "team owners": "团队负责人",
  "daily targets": "每日目标"
});

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
const originalInputValues = new WeakMap();
let currentLanguage = localStorage.getItem("tiger-ai-language") || "en";

const translatePhrase = (text) => {
  return currentLanguage === "zh" && languageText[text] ? languageText[text] : text;
};

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

const translateStoredInputValue = (input, language) => {
  if (input.dataset.i18nValueOriginal) {
    const original = input.dataset.i18nValueOriginal;
    input.value = language === "zh" && languageText[original] ? languageText[original] : original;
    return;
  }

  if (!originalInputValues.has(input)) {
    originalInputValues.set(input, input.value);
  }

  const original = originalInputValues.get(input);
  input.value = language === "zh" && languageText[original] ? languageText[original] : original;
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
  document.querySelectorAll("[data-result-promised], [data-handover-rule]").forEach((input) => translateStoredInputValue(input, language));
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

window.TigerI18n = {
  translate: (text) => translatePhrase(text),
  applyCurrent: () => applyLanguage(currentLanguage),
  getLanguage: () => currentLanguage
};

addLanguageToggle();
applyLanguage(currentLanguage);
