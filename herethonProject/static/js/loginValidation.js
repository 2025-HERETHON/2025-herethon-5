// getElementById로 HTML input 요소들 불러오기 -> 각 요소의 값이나 스타일 수정 가능 
const idInput = document.getElementById('id');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

const engRegex = /^[A-Za-z]+$/; // 영문자만 허용하는 정규 표현식

function validateInputs() {
    const idValue = idInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const isIdValid = engRegex.test(idValue); // 영문자만 포함하는지 검증 
    const isPasswordValid = /^(?=.*[A-Za-z]).{8,}$/.test(passwordValue); // 최소 8자 이상, 영문자 1개 이상 포함 여부 확인 


    if(isIdValid && isPasswordValid) {
        submitBtn.classList.add('active');
    } else {
    submitBtn.classList.remove('active');
    }
}

// input 이벤트 연결
idInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);

// 클릭 이벤트 연결
submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('active')) {
        window.location.href = '../templates/complete.html';
    }
});