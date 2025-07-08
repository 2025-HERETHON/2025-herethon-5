const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm')
const submitBtn = document.getElementById('submitBtn');

// 정규 표현식
const engRegex = /^[A-Za-z]+$/;
const korRegex = /^[가-힣]+$/;

function validateInputs() {
    const idValue = idInput.value.trim();
    const nameValue = nameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const passwordConfirmValue = passwordConfirmInput.value.trim();

    const isIdValid = engRegex.test(idValue);
    const isNameValid = korRegex.test(nameValue);
    const isPasswordValid = /^(?=.*[A-Za-z]).{8,}$/.test(passwordValue);
    const isPasswordConfirmValid = /^(?=.*[A-Za-z]).{8,}$/.test(passwordConfirmValue);


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
        submitBtn.classList.add('active');
    } else {
    submitBtn.classList.remove('active');
    }
}

// input 이벤트 연결
idInput.addEventListener('input', validateInputs);
nameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
passwordConfirmInput.addEventListener('input', validateInputs);

// 클릭 이벤트 연결
submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('active')) {
        window.location.href = '../templates/complete.html';
    }
});