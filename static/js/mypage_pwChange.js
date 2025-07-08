// 비밀번호 변경 유효성 검사
const currentInput = document.getElementById("pw-current");
const newInput = document.getElementById("pw-new");
const new2Input = document.getElementById("pw-new2");
const pwForm = document.getElementById("pw-form");
const pwBtn = document.querySelector(".pw-btn");

function validatePwForm() {
  const current = currentInput.value.trim();
  const newPw = newInput.value.trim();
  const newPw2 = new2Input.value.trim();

  // 단순 유효성만 체크
  const isCurrentValid = current.length > 0;
  const isNewValid = /^.{8,}$/.test(newPw);
  const isMatch = newPw === newPw2 && newPw.length > 0;

  // 버튼 활성/비활성 처리
  if (isCurrentValid && isNewValid && isMatch) {
    pwBtn.classList.add("active");
    pwBtn.disabled = false;
  } else {
    pwBtn.classList.remove("active");
    pwBtn.disabled = true;
  }
  return isCurrentValid && isNewValid && isMatch;
}

[currentInput, newInput, new2Input].forEach((input) => {
  input.addEventListener("input", validatePwForm);
});

// 제출 시 유효성만 체크, 정상 제출은 서버가 처리
pwForm.addEventListener("submit", function (e) {
  if (!validatePwForm()) {
    e.preventDefault();
  }
});
