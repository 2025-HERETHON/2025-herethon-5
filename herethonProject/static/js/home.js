document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropbtn.addEventListener('click', function(event) {
            dropdownContent.classList.toggle('show');
            event.stopPropagation(); // 클릭 이벤트 전파 방지
        });
    });

    window.addEventListener('click', function(event) {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            // 클릭된 영역이 드롭다운 컨테이너에 속하지 않고, 드롭다운이 열려 있다면 닫음
            if (dropdownContent.classList.contains('show') && !dropdown.contains(event.target)) {
                 dropdownContent.classList.remove('show');
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

