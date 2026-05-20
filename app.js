const navLinks = document.querySelectorAll(".main-nav a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
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
    admin: "AI Admin Company",
    support: "AI Customer Support Company",
    content: "AI Content Agency",
    sales: "AI Sales Follow-up Company"
  };
  templateName.textContent = names[chosenTemplate] || names.admin;
}

const loginForm = document.querySelector("[data-login-form]");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("[data-login-status]");
    if (status) {
      status.textContent = "Workspace access preview only. Real signup will be added in the full MVP.";
    }
  });
}

const earlyAccessForm = document.querySelector("[data-early-access]");

if (earlyAccessForm) {
  earlyAccessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = earlyAccessForm.querySelector("input");
    if (input) {
      input.value = "";
      input.placeholder = "Early access preview saved locally";
    }
  });
}
