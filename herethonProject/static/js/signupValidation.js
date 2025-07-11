// getElementById로 HTML input 요소들 불러오기 -> 각 요소의 값이나 스타일 수정 가능 
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm')
const submitBtn = document.getElementById('submitBtn');


const engRegex = /^[A-Za-z]+$/; // 영문자만 허용하는 정규 표현식
const korRegex = /^[가-힣]+$/; // 한글만 허용하는 정규 표현식 

function validateInputs() {
    const idValue = idInput.value.trim(); // trim() : 앞 뒤 공백 제거 
    const nameValue = nameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const passwordConfirmValue = passwordConfirmInput.value.trim();

    const isIdValid = engRegex.test(idValue); // 영문만 포함하는지 검사
    const isNameValid = korRegex.test(nameValue); // 한글만 포함하는지 검사 
    const isPasswordValid = /^(?=.*[A-Za-z]).{8,}$/.test(passwordValue); // 최소 8자 이상, 영문자 1개 이상 포함 여부 확인 
    const isPasswordConfirmValid = /^(?=.*[A-Za-z]).{8,}$/.test(passwordConfirmValue); // 동일 

    if(isIdValid){
        idInput.style.backgroundColor='rgba(189, 174, 217, 0.20)';
        idInput.style.borderColor= '#BDAED9';
        idInput.style.color="black";
    } else {
        idInput.style.backgroundColor = 'white';
    }

    if (isNameValid) {
        nameInput.style.backgroundColor = 'rgba(189, 174, 217, 0.20)';
        nameInput.style.borderColor= '#BDAED9';
        nameInput.style.color="black";
    } else {
        nameInput.style.backgroundColor = 'white';
    }

    if (isPasswordValid) {
        passwordInput.style.backgroundColor = 'rgba(189, 174, 217, 0.20)';
        passwordInput.style.borderColor= '#BDAED9';
        passwordInput.style.color="black";
    } else {
        passwordInput.style.backgroundColor = 'white';
    }
    if (isPasswordConfirmValid) {
        passwordConfirmInput.style.backgroundColor = 'rgba(189, 174, 217, 0.20)';
        passwordConfirmInput.style.borderColor= '#BDAED9';
        passwordConfirmInput.style.color="black";
    } else {
        passwordConfirmInput.style.backgroundColor = 'white';
    }

    if(isIdValid && isNameValid && isPasswordValid && isPasswordConfirmValid && passwordInput.value===passwordConfirmInput.value) {
        submitBtn.classList.add('active'); // 모두 true인 경우 submitBtn 클래스에 active 클래스 추가
    } else {
    submitBtn.classList.remove('active'); // 하나라도 false인 경우 submitBtn 클래스에서 active 클래스 제거 
    }
}

// input 이벤트 연결(사용자가 input에 입력할 때마다 validateInputs 함수 실행)
idInput.addEventListener('input', validateInputs);
nameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
passwordConfirmInput.addEventListener('input', validateInputs);

// 클릭 이벤트 연결(버튼이 활성화된 경우, complete.html로 이동)
submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('active')) {
        window.location.href = '../templates/complete.html';
    }
});