document.addEventListener('DOMContentLoaded', function() {
    // 모든 .card-link 요소 가져옴
    const cardLinks = document.querySelectorAll('.card-link');

    cardLinks.forEach(link => {
        const cardContainer = link.querySelector('.card-container');

        // cardContainer가 없는 경우는 예외 처리
        if (!cardContainer) {
            console.warn('card-link 내부에 card-container가 없습니다.', link);
            return;
        }

        // 'disabled' 클래스를 가진 강의 (접근 불가능한 강의) 클릭 시
        if (cardContainer.classList.contains('disabled')) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // 비활성화된 링크는 페이지 이동을 막고 알림만 띄움 
                alert('먼저 이전 강의를 완료하십시오.');
                console.log('비활성화된 강의가 클릭되었습니다. 이전 강의 완료 필요.');
            });
        }
    });
});