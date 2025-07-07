document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const accountImage = dropbtn.querySelector('img'); // account 이미지 요소 찾기

        // 이미지 경로
        const originalAccountSrc = '../assets/img/account.svg'; 
        const clickedAccountSrc = '../assets/img/account-2.svg';

        dropbtn.addEventListener('click', function(event) {
            dropdownContent.classList.toggle('show');

            // 이미지 소스 교체
            if (dropdownContent.classList.contains('show')) { // 드롭다운이 열릴 때 (show 클래스가 추가될 때)
                accountImage.src = clickedAccountSrc; // 클릭된 이미지로 변경
            } else { // 드롭다운이 닫힐 때 (show 클래스가 제거될 때)
                accountImage.src = originalAccountSrc; // 원래 이미지로 변경
            }

            event.stopPropagation(); // 클릭 이벤트 전파 방지
        });
    });

    window.addEventListener('click', function(event) {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            const dropbtn = dropdown.querySelector('.dropbtn');
            const accountImage = dropbtn.querySelector('img'); // account 이미지

            // 이미지 경로
            const originalAccountSrc = '../assets/img/account.svg';

            // 클릭된 영역이 드롭다운 컨테이너에 속하지 않고, 드롭다운이 열려 있다면 닫음
            if (dropdownContent.classList.contains('show') && !dropdown.contains(event.target)) {
                dropdownContent.classList.remove('show');
                // 드롭다운이 닫힐 때 이미지 소스를 원래대로 돌림
                accountImage.src = originalAccountSrc;
            }
         });
    });
});