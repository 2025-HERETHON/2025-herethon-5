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
const feedbackBtn = document.querySelector(".feedback-btn");
const feedbackForm = document.querySelector(".feedback-form");

function validateFeedback() {
  const partOk = partInput.value.trim().length > 0;
  const opinionOk = opinionInput.value.trim().length > 0;
  const emailOk =
    emailInput.value.trim().length > 0 &&
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(emailInput.value.trim());

  if (partOk && opinionOk && emailOk) {
    feedbackBtn.disabled = false;
    feedbackBtn.classList.add("active");
  } else {
    feedbackBtn.disabled = true;
    feedbackBtn.classList.remove("active");
  }
}

// 실시간 체크
[partInput, opinionInput, emailInput].forEach((input) =>
  input.addEventListener("input", validateFeedback)
);

// 전송 이벤트
feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (feedbackBtn.disabled) return;

  // ---- 실제 저장 ----
  const feedbackData = {
    part: partInput.value.trim(),
    opinion: opinionInput.value.trim(),
    email: emailInput.value.trim(),
  };
  // 일단 localStorage에 저장
  localStorage.setItem("lastFeedback", JSON.stringify(feedbackData));
  // 나중에 서버에 fetch로 POST

  // 완료 페이지 이동
  window.location.href = "./feedbackComplete.html";
});
