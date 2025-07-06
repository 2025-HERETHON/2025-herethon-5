const blindIcon = document.getElementById('blindIcon');
const password = document.getElementById('password');

blindIcon.addEventListener('click', function() {
    const type=password.getAttribute('type') === 'password'? 'text' : 'password';
    password.setAttribute('type', type);

    this.src=type === 'password'? '../static/assets/Blind.png': '../static/assets/Blind (1).png';
});

// 두 번째 비밀번호 확인 필드 
const blindIconConfirn = document.getElementById('blindIconConfirm');
const passwordConfirm = document.getElementById('passwordConfirm');

blindIconConfirm.addEventListener('click', function() {
    const type=passwordConfirm.getAttribute('type') === 'password'? 'text' : 'password';
    passwordConfirm.setAttribute('type', type);

    this.src=type === 'password'? '../static/assets/Blind.png': '../static/assets/Blind (1).png';
});