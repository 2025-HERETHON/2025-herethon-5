const dateTab = document.getElementById("date-tab");
const partTab = document.getElementById("part-tab");
const byDate = document.getElementById("study-by-date");
const byPart = document.getElementById("study-by-part");

dateTab.addEventListener("click", function () {
  byDate.style.display = "block";
  byPart.style.display = "none";
  dateTab.classList.add("active");
  partTab.classList.remove("active");
});

partTab.addEventListener("click", function () {
  byDate.style.display = "none";
  byPart.style.display = "block";
  partTab.classList.add("active");
  dateTab.classList.remove("active");
});

// 첫 진입 시 날짜별 표시
byDate.style.display = "block";
byPart.style.display = "none";