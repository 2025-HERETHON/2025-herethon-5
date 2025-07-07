function scrollToMain() {
  const mainSection = document.getElementById("main");
  mainSection.scrollIntoView({ behavior: "smooth" });
}
window.addEventListener("wheel", scrollToMain, { once: true });
window.addEventListener("click", scrollToMain, { once: true });
setTimeout(scrollToMain, 4000);

const btn = document.getElementById("start-btn");
const popup = document.querySelector(".login-warning-popup");

btn.addEventListener("mouseenter", () => {
  popup.classList.add("visible");
});
btn.addEventListener("mouseleave", () => {
  popup.classList.remove("visible");
});
