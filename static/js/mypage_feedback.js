//사이드바 탭 (나의 학습, 비밀번호 변경, 의견 보내기)
const navTabs = document.querySelectorAll(".mypage-nav .nav-tab");
const sections = document.querySelectorAll(".mypage-section");

navTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    navTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    sections.forEach((sec) => sec.classList.remove("active"));
    const target = this.getAttribute("data-target");
    document.querySelector(`.mypage-section.${target}`).classList.add("active");
  });
});

//의견 보내기
const partInput = document.getElementById("partInput");
const opinionInput = document.getElementById("opinionInput");
const emailInput = document.getElementById("emailInput");
const feedbackForm = document.getElementById("feedback-form");
const feedbackBtn = document.querySelector(".feedback-btn");

function validateFeedback() {
  const partOk = partInput.value.trim().length > 0;
  const opinionOk = opinionInput.value.trim().length > 0;
  const emailOk =
    emailInput.value.trim().length > 0 &&
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(emailInput.value.trim());

  if (partOk && opinionOk && emailOk) {
    feedbackBtn.classList.add("active");
    feedbackBtn.disabled = false;
  } else {
    feedbackBtn.classList.remove("active");
    feedbackBtn.disabled = true;
  }
  return partOk && opinionOk && emailOk;
}

[partInput, opinionInput, emailInput].forEach((input) =>
  input.addEventListener("input", validateFeedback)
);

// 제출 시 유효성만 체크, 정상 제출은 서버가 처리
feedbackForm.addEventListener("submit", function (e) {
  if (!validateFeedback()) {
    e.preventDefault();
  }
});
