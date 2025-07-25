// getElementById로 HTML input 요소들 불러오기 -> 각 요소의 값이나 스타일 수정 가능 
const blindIcon = document.getElementById('blindIcon');
const password = document.getElementById('password');

if(blindIcon) {
    blindIcon.addEventListener('click', function() {
    const type=password.getAttribute('type') === 'password'? 'text' : 'password';
    password.setAttribute('type', type);

    this.src = type === 'password' ? this.dataset.blind : this.dataset.blind1;
    });
}

// 두 번째 비밀번호 확인 필드 
const blindIconConfirm = document.getElementById('blindIconConfirm');
const passwordConfirm = document.getElementById('passwordConfirm');

if(blindIconConfirm){
    blindIconConfirm.addEventListener('click', function() {
    const type=passwordConfirm.getAttribute('type') === 'password'? 'text' : 'password';
    passwordConfirm.setAttribute('type', type);

    this.src = type === 'password' ? this.dataset.blind : this.dataset.blind1;
    });
} 