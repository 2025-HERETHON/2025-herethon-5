document.addEventListener('DOMContentLoaded', function() {
    // account 영역 내의 드롭다운 버튼과 드롭다운 콘텐츠를 직접 선택
    const dropbtn = document.querySelector('.account .dropbtn');
    const dropdownContent = document.querySelector('.account .dropdown-content');
    const accountSpan = document.querySelector('.account'); 

    // 로그인 상태일 때만 (즉, dropbtn과 dropdownContent가 존재할 때만) 스크립트를 실행
    if (dropbtn && dropdownContent && accountSpan) {
        const accountImage = dropbtn.querySelector('img'); // account 이미지 요소 찾기

        // 이미지 경로 정의
        const originalAccountSrc = '../../static/assets/img/account.svg';
        const clickedAccountSrc = '../../static/assets/img/account-2.svg'; // 클릭 시 변경될 이미지 경로

        // 드롭다운 버튼 클릭 이벤트 리스너
        dropbtn.addEventListener('click', function(event) {
            event.stopPropagation();

            // 'show' 클래스를 토글
            dropdownContent.classList.toggle('show');

            // 드롭다운이 열렸는지(show 클래스가 있는지)에 따라 이미지 소스를 변경
            if (dropdownContent.classList.contains('show')) {
                accountImage.src = clickedAccountSrc; // 클릭된 이미지로 변경
            } else {
                accountImage.src = originalAccountSrc; // 원래 이미지로 변경
            }
        });

        // 윈도우 전체 클릭 이벤트 리스너 (드롭다운 외부 클릭 시 닫기)
        window.addEventListener('click', function(event) {
            if (dropdownContent.classList.contains('show') && !accountSpan.contains(event.target)) {
                dropdownContent.classList.remove('show'); // 드롭다운 닫기
                accountImage.src = originalAccountSrc; // 드롭다운이 닫힐 때 이미지 소스를 원래대로 돌리기
            }
        });
    }
});