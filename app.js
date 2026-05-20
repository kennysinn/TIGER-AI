const loginDialog = document.querySelector(".login-dialog");
const loginButtons = document.querySelectorAll("[data-open-login]");

loginButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof loginDialog.showModal === "function") {
      loginDialog.showModal();
      return;
    }

    loginDialog.setAttribute("open", "");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && loginDialog.open) {
    loginDialog.close();
  }
});

