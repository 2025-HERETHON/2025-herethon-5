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

// 날짜별, 파트별 탭
const tabs = document.querySelectorAll(".filter-tabs .tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// 비밀번호 변경
// 임시 기존 비밀번호 (나중에 서버로 받아오기)
const REAL_PASSWORD = "qwerty123";

const currentInput = document.getElementById("pw-current");
const newInput = document.getElementById("pw-new");
const new2Input = document.getElementById("pw-new2");
const pwForm = document.getElementById("pw-form");
const pwBtn = document.querySelector(".pw-btn");

function validatePwForm() {
  const current = currentInput.value;
  const newPw = newInput.value;
  const newPw2 = new2Input.value;

  // 1. 기존 비밀번호 일치
  const isCurrentValid = current === REAL_PASSWORD && current.length > 0;
  // 2. 새 비밀번호: 영문 8자 이상
  const isNewValid = /^[A-Za-z]{8,}$/.test(newPw);
  // 3. 새 비밀번호와 확인 일치
  const isMatch = newPw === newPw2 && newPw.length > 0;

  currentInput.style.backgroundColor = isCurrentValid
    ? "rgba(189,174,217,0.2)"
    : "white";
  newInput.style.backgroundColor = isNewValid
    ? "rgba(189,174,217,0.2)"
    : "white";
  new2Input.style.backgroundColor = isMatch ? "rgba(189,174,217,0.2)" : "white";

  // 버튼 활성/비활성
  if (isCurrentValid && isNewValid && isMatch) {
    pwBtn.classList.add("active");
    pwBtn.disabled = false;
  } else {
    pwBtn.classList.remove("active");
    pwBtn.disabled = true;
  }
  // return 값(제출시 활용)
  return isCurrentValid && isNewValid && isMatch;
}

// 실시간 체크
[currentInput, newInput, new2Input].forEach((input) => {
  input.addEventListener("input", validatePwForm);
});

// 제출(완료 페이지 이동)
pwForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validatePwForm()) {
    window.location.href = "./pwComplete.html";
  }
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
