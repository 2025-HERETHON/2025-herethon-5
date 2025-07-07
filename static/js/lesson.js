// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // URL에서 현재 학습 ID를 추출 (예: lesson_1.html -> 1, lesson_2.html -> 2)
    const urlParams = window.location.pathname.split('/');
    const fileName = urlParams[urlParams.length - 1]; // 파일명 (예: lesson_1.html)
    const lessonIdMatch = fileName.match(/lesson_(\d+)\.html/); // lesson_숫자.html으로 패턴 매칭
            
    // 현재 학습의 ID를 currentLessonId 변수에 저장합
    const currentLessonId = lessonIdMatch ? parseInt(lessonIdMatch[1]) : null;

    // '학습 완료' 버튼 요소 가져옴
    const completeButton = document.getElementById('completeLessonButton');

    // 버튼이 존재하면 클릭 이벤트 리스너 추가
    if (completeButton) {
        completeButton.addEventListener('click', () => {
            // 현재 학습 ID가 유효한 경우에만 completeLesson 함수 호출
            if (currentLessonId !== null) {
                completeLesson(currentLessonId);
            } else {
                console.error("Lesson ID를 찾을 수 없습니다.");
                alert("학습 ID를 가져오는 데 오류가 발생했습니다.");
            }
        });
    }
});

// 학습 완료 처리 함수
function completeLesson(lessonId) {
    // localStorage에서 현재까지 완료된 학습 목록을 가져옴
    let completedLessons = JSON.parse(localStorage.getItem('completedLessons_notion')) || [];
    // localStorage에서 현재 진행 중인 학습 ID를 가져옴, 없으면 1로 초기화
    let storedCurrentLessonId = parseInt(localStorage.getItem('currentLessonId_notion')) || 1;

    // 순서대로 학습을 완료하는지 확인
    if (lessonId !== storedCurrentLessonId) {
        alert('이전 학습을 먼저 완료해주세요!');
        return; 
    }

    // 현재 학습이 이미 완료된 목록에 없다면 추가
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons_notion', JSON.stringify(completedLessons));
    }

    // 다음 학습 ID로 'currentLessonId'를 업데이트
    const nextLessonId = lessonId + 1;
    localStorage.setItem('currentLessonId_notion', nextLessonId);

    // 학습 완료 후 개념 목록 페이지로 돌아감
    window.location.href = '../part-notion.html';
}