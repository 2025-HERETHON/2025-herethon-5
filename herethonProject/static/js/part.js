document.addEventListener('DOMContentLoaded', () => {
    const cardContainers = document.querySelectorAll('.card-container');

    function loadLessonStates() {
        // 'currentLessonId' 대신 'currentLessonId_notion' 사용 주의 
        let completedLessons = JSON.parse(localStorage.getItem('completedLessons_notion')) || [];
        let currentLessonId = parseInt(localStorage.getItem('currentLessonId_notion')) || 1;

        cardContainers.forEach(cardContainer => {
            const lessonId = parseInt(cardContainer.dataset.lessonId);

            cardContainer.classList.remove('completed', 'current', 'initial-state');
            cardContainer.classList.add('initial-state');

            if (completedLessons.includes(lessonId)) {
                cardContainer.classList.add('completed');
                cardContainer.classList.remove('initial-state');
            } else if (lessonId === currentLessonId) {
                cardContainer.classList.add('current');
                cardContainer.classList.remove('initial-state');
            }
        });
    }

    // 카드 클릭 이벤트 처리
    cardContainers.forEach(cardContainer => {
        cardContainer.addEventListener('click', () => {
            // 'currentLessonId' 대신 'currentLessonId_notion' 사용 주의 
            const lessonId = parseInt(cardContainer.dataset.lessonId);
            let currentLessonId = parseInt(localStorage.getItem('currentLessonId_notion')) || 1;
            let completedLessons = JSON.parse(localStorage.getItem('completedLessons_notion')) || [];

            // 1. 이미 학습 완료된 파트인지 확인
            if (completedLessons.includes(lessonId)) {
                alert('이미 학습하셨습니다!');
                return; 
            }

            // 2. 현재 진행해야 할 학습 파트인지 확인 
            if (lessonId !== currentLessonId) {
                alert('이전 학습을 먼저 완료해주세요!');
                return; 
            }

            // 3. 위 두 조건에 해당하지 않으면 해당 학습 페이지로 이동
            window.location.href = `../templates/lesson/lesson_${lessonId}.html`;
        });
    });

    // 초기 로드 시 학습 상태 적용
    loadLessonStates();

    // ✅ 학습 상태 초기화 버튼 (개발용) - 다른 상세 페이지를 구현하지 않아 임시로 localStrage를 만들어 제대로 작동하는지 확인하고자 제작.
    const resetButton = document.createElement('button');
    resetButton.textContent = '개념 학습 상태 초기화';
    resetButton.style.position = 'fixed';
    resetButton.style.bottom = '10px';
    resetButton.style.right = '10px';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', () => {
        // 'completedLessons' 대신 'completedLessons_notion' 사용 주의 
        localStorage.removeItem('completedLessons_notion');
        localStorage.removeItem('currentLessonId_notion');
        loadLessonStates();
        alert('개념 학습 상태가 초기화되었습니다.');
    });
});