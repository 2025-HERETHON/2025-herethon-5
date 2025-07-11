function scrollToMain() {
  const mainSection = document.getElementById("main");
  mainSection.scrollIntoView({ behavior: "smooth" });
}
//스크롤 또는 화면 클릭 시 main section으로 이동
window.addEventListener("wheel", scrollToMain, { once: true });
window.addEventListener("click", scrollToMain, { once: true });
setTimeout(scrollToMain, 4000);

//학습 시작하기 버튼 hover 시 경고 문구 추가
const btn = document.getElementById("start-btn");
const popup = document.querySelector(".login-warning-popup");

btn.addEventListener("mouseenter", () => {
  popup.classList.add("visible");
});
btn.addEventListener("mouseleave", () => {
  popup.classList.remove("visible");
});
