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

//날짜별 파트별 section 전환
// 1. 더미 데이터
// const studyList = [
//   {
//     part: "개념",
//     date: "2025.07.03",
//     title: "페미니즘",
//     desc: "페미니즘의 학술적 정의 알기 쉽게 배워보기",
//   },
//   {
//     part: "개념",
//     date: "2025.07.02",
//     title: "본질주의적 페미니즘",
//     desc: "본질주의적 페미니즘의 학술적 정의 알기 쉽게 배워보기",
//   },
//   {
//     part: "사건",
//     date: "2025.07.02",
//     title: "강남역 살인사건",
//     desc: "강남역 살인사건의 내용부터 논쟁까지 알아보기",
//   },
//   {
//     part: "사건",
//     date: "2025.07.02",
//     title: "미투(#MeToo) 운동",
//     desc: "미투(#MeToo) 운동은 어떻게 시작되었을까?",
//   },
// ];

// // 2. 날짜 형식 변환 함수 ("2025.07.03" → "7/3")
// function formatDateShort(dateStr) {
//   const [, mm, dd] = dateStr.split(".");
//   return `${parseInt(mm, 10)}/${parseInt(dd, 10)}`;
// }

// // 3. 렌더링 함수 (type: 'date' 또는 'part')
// function renderStudy(type = "date") {
//   let grouped = {};
//   if (type === "date") {
//     // 날짜별로 그룹
//     studyList.forEach((item) => {
//       if (!grouped[item.date]) grouped[item.date] = [];
//       grouped[item.date].push(item);
//     });
//   } else {
//     // 파트별로 그룹
//     studyList.forEach((item) => {
//       if (!grouped[item.part]) grouped[item.part] = [];
//       grouped[item.part].push(item);
//     });
//   }

//   // 렌더링
//   const studySection = document.querySelector(".study-group-list");
//   studySection.innerHTML = "";
//   Object.keys(grouped).forEach((group) => {
//     const groupElem = document.createElement("section");
//     groupElem.className = "study-group";

//     const h2 = document.createElement("h2");
//     h2.textContent = type === "date" ? formatDateShort(group) : group;
//     groupElem.appendChild(h2);

//     const ul = document.createElement("ul");
//     ul.className = "study-list";
//     grouped[group].forEach((item, idx) => {
//       const li = document.createElement("li");
//       li.className = "study-card";
//       li.innerHTML = `
//         <div class="study-number">${String(idx + 1).padStart(2, "0")}</div>
//         <div class="study-info">
//           <div class="study-title">${item.title}</div>
//           <div class="study-desc">${item.desc}</div>
//         </div>
//         <div class="study-meta">
//           <span class="study-date">최근 학습일 ${item.date}</span>
//           <span class="study-dot"></span>
//         </div>
//       `;
//       ul.appendChild(li);
//     });
//     groupElem.appendChild(ul);
//     studySection.appendChild(groupElem);
//   });
// }

// 4. 탭 버튼 이벤트
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
