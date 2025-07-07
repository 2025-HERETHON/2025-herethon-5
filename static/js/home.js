document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const accountImage = dropbtn.querySelector('img'); // account 이미지 요소 찾기

        // 이미지 경로
        const originalAccountSrc = '../static/assets/img/account.svg'; 
        const clickedAccountSrc = '../static/assets/img/account-2.svg';

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
            const originalAccountSrc = '../static/assets/img/account.svg';

            // 클릭된 영역이 드롭다운 컨테이너에 속하지 않고, 드롭다운이 열려 있다면 닫음
            if (dropdownContent.classList.contains('show') && !dropdown.contains(event.target)) {
                dropdownContent.classList.remove('show');
                // 드롭다운이 닫힐 때 이미지 소스를 원래대로 돌림
                accountImage.src = originalAccountSrc;
            }
         });
    });

    // 학습 진행 상황 로직 
    // 각 파트별 총 학습 개수 정의
    const totalLessonsByPart = {
        notion: 4,  // 개념 파트의 전체 학습 개수 
        event: 5,   // 사건 파트의 전체 학습 개수
        person: 5,  // 인물 파트의 전체 학습 개수
        history: 4  // 역사 파트의 전체 학습 개수
    };

    // 각 파트의 진행 상황을 업데이트
    function updateAllPartProgress() {
        const parts = ['notion', 'event', 'person', 'history']; // 모든 파트 ID 접미사

        parts.forEach(part => {
            // 해당 파트의 진행 상황을 표시할 <span> 요소 가져옴 (예: id="progress-notion")
            const progressSpan = document.getElementById(`progress-${part}`);

            if (progressSpan) {
                // localStorage에서 해당 파트의 완료된 학습 ID 목록 가져옴
                // 예: 'completedLessons_notion', 'completedLessons_event'
                let completedLessons = JSON.parse(localStorage.getItem(`completedLessons_${part}`)) || [];
                
                // 완료된 학습의 고유한 개수를 세어 중복 방지
                const uniqueCompletedCount = new Set(completedLessons).size;
                
                // 해당 파트의 총 학습 개수를 가져옴
                const totalCount = totalLessonsByPart[part];

                // <span> 요소의 텍스트 내용 업데이트
                progressSpan.textContent = `${uniqueCompletedCount}/${totalCount}`;
            }
        });
    }

    // 페이지 로드 시 모든 파트의 진행 상황 업데이트 함수 호출
    updateAllPartProgress();
});

