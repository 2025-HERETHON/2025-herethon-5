const idInput = document.getElementById('id');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

// 정규 표현식
const engRegex = /^[A-Za-z]+$/;

function validateInputs() {
    const idValue = idInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const isIdValid = engRegex.test(idValue);
    const isPasswordValid = /^(?=.*[A-Za-z]).{8,}$/.test(passwordValue);


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