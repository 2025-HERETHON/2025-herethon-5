document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.card-container');

    cardContainers.forEach(card => {
        // 접근 불가능한 카드는 클릭 이벤트를 등록하지 않거나, 이벤트 핸들러에서 바로 반환
        if (card.classList.contains('disabled')) {
            return; // disabled 카드는 이벤트 리스너 등록하지 않음
        }

        card.addEventListener('click', function() {
            const itemId = this.dataset.itemId; // data-item-id 속성 값 가져오기
            const isCompleted = this.classList.contains('completed'); // 현재 완료 상태 확인

            // 이미 완료된 카드를 다시 클릭하거나, 접근 불가능한 카드를 클릭한 경우 무시
            if (isCompleted) {
                console.log(`Item ${itemId} is already completed.`);
                return;
            }

            this.classList.add('completed');
            this.classList.remove('current'); 
            
            // 백엔드에 완료 요청 보내기
            markItemAsCompleted(itemId, this); // 현재 카드 요소를 함께 전달하여 성공 시 UI 업데이트
        });
    });

    // 백엔드로 완료 요청을 보내는 함수
    async function markItemAsCompleted(itemId, cardElement) {
        const csrfToken = getCookie('csrftoken'); // 아래에 getCookie 함수 예시 있음

        try {
            const response = await fetch(`/api/curriculums/${itemId}/complete/`, { // 백엔드 API 엔드포인트 예시
                method: 'POST', // 또는 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // CSRF 토큰 추가
                },
                body: JSON.stringify({ is_completed: true }) // 백엔드에서 필요한 데이터 형식으로 전송
            });

            if (!response.ok) {
                // 백엔드에서 에러 응답이 오면 에러 처리
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Completion successful:', data);

            // 다음 학습 항목을 'current'로 설정
            if (data.next_item_id) {
                // 다음 current 항목의 HTML 요소 찾기
                const nextCardElement = document.querySelector(`[data-item-id="${data.next_item_id}"]`);
                if (nextCardElement) {
                    nextCardElement.classList.add('current'); // 다음 항목에 current 클래스 추가
                    console.log(`Item ${data.next_item_id} is now current.`);
                }
            } else if (data.all_completed_in_category) {
                // 카테고리 내 모든 항목이 완료된 경우
                console.log('All items in this category are now completed!');
                alert('이 카테고리의 모든 학습을 완료했습니다.');
            }
            
        } catch (error) {
            console.error('Error marking item as completed:', error);
            cardElement.classList.remove('completed');
            // 필요하다면 사용자에게 오류 메시지 표시
            alert('항목을 완료 처리하는 데 실패했습니다.');
        }
    }

    // CSRF 토큰을 가져오는 헬퍼 함수
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});