const currentPage = window.location.pathname.split("/").pop() || "index.html";
const inChineseSite = window.location.pathname.includes("/zh/");

document.querySelectorAll(".main-nav a").forEach((link) => {
  const href = link.getAttribute("href") || "";
  const target = href.split("/").pop() || "index.html";
  const isWorkspaceChild = ["business-kit.html", "demo-link.html", "company.html"].includes(currentPage) && target === "workspace.html";
  const isDashboard = currentPage.includes("dashboard") && target.includes("dashboard");

  if (target === currentPage || isWorkspaceChild || isDashboard) {
    link.classList.add("active");
  }
});

document.querySelectorAll("[data-demo-submit]").forEach((button) => {
  button.addEventListener("click", () => {
    const status = document.querySelector("[data-demo-status]");
    if (status) {
      status.textContent = inChineseSite
        ? "静态预览：真实 AI 回答会在后端接通后启用。"
        : "Static preview: real AI replies will be enabled after backend integration.";
    }
  });
});

document.querySelectorAll("[data-copy-demo]").forEach((button) => {
  button.addEventListener("click", async () => {
    const link = "https://tiger.ai/demo/speed-to-lead";
    const status = document.querySelector("[data-copy-status]");

    try {
      await navigator.clipboard.writeText(link);
      if (status) {
        status.textContent = inChineseSite ? "Demo link 已复制。" : "Demo link copied.";
      }
    } catch (_error) {
      if (status) {
        status.textContent = link;
      }
    }
  });
});
