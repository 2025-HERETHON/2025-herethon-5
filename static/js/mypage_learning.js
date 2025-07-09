//사이드바 탭 (나의 학습, 비밀번호 변경, 의견 보내기)
const navTabs = document.querySelectorAll(".mypage-nav .nav-tab");
const sections = document.querySelectorAll(".mypage-section");

navTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    navTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    sections.forEach((sec) => sec.classList.remove("active"));
    const target = this.getAttribute("data-target");
    document.querySelector(`.mypage-section.${target}`).classList.add("active");
  });
});

// 날짜별, 파트별 탭
const tabs = document.querySelectorAll(".filter-tabs .tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// 탭 버튼 이벤트
const dateTab = document.getElementById("date-tab");
const partTab = document.getElementById("part-tab");

dateTab.addEventListener("click", function () {
  dateTab.classList.add("active");
  partTab.classList.remove("active");
  renderStudy("date");
});

partTab.addEventListener("click", function () {
  partTab.classList.add("active");
  dateTab.classList.remove("active");
  renderStudy("part");
});

// 5. 페이지 첫 진입 시 날짜별로 초기화
renderStudy("date");
