// 비밀번호 변경 유효성 검사
const currentInput = document.getElementById("pw-current");
const newInput = document.getElementById("pw-new");
const new2Input = document.getElementById("pw-new2");
const pwForm = document.getElementById("pw-form");
const pwBtn = document.querySelector(".pw-btn");

// 정규식: 영문 8자 이상 
const pwRegex = /^(?=.*[A-Za-z]).{8,}$/;

function validatePwForm() {
  const current = currentInput.value.trim();
  const newPw = newInput.value.trim();
  const newPw2 = new2Input.value.trim();

  const isCurrentValid = current.length > 0; //비어있는지만 체크
  const isNewValid = pwRegex.test(newPw);
  const isNew2Valid = pwRegex.test(newPw2);
  const isMatch = newPw === newPw2 && newPw.length > 0;

  // 입력창 스타일 처리
  if (isCurrentValid) {
    currentInput.style.backgroundColor = 'rgba(189, 174, 217, 0.20)';
    currentInput.style.borderColor = '#BDAED9';
    currentInput.style.color = 'black';
  } else {
    currentInput.style.backgroundColor = 'white';
    currentInput.style.borderColor = '#d9d9d9';
    currentInput.style.color = '#333';
  }

  if (isNewValid) {
    newInput.style.backgroundColor = 'rgba(189, 174, 217, 0.20)';
    newInput.style.borderColor = '#BDAED9';
    newInput.style.color = 'black';
  } else {
    newInput.style.backgroundColor = 'white';
    newInput.style.borderColor = '#d9d9d9';
    newInput.style.color = '#333';
  }

  if (isNew2Valid) {
    new2Input.style.backgroundColor = 'rgba(189, 174, 217, 0.20)';
    new2Input.style.borderColor = '#BDAED9';
    new2Input.style.color = 'black';
  } else {
    new2Input.style.backgroundColor = 'white';
    new2Input.style.borderColor = '#d9d9d9';
    new2Input.style.color = '#333';
  }

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

// 입력 시마다 실시간 체크
[currentInput, newInput, new2Input].forEach((input) => {
  input.addEventListener("input", validatePwForm);
});

// 제출 시 유효성 검사 (비정상 시 제출 막기)
pwForm.addEventListener("submit", function (e) {
  if (!validatePwForm()) {
    e.preventDefault();
  }
});

// 페이지 진입시 버튼 상태 갱신(초기화)
validatePwForm();
