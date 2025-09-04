function showScreen(screenId) {
  // 모든 화면 숨기기
  const screens = document.querySelectorAll("body > div");
  screens.forEach(s => s.classList.add("hidden"));

  // 선택한 화면만 보이기
  document.getElementById(screenId).classList.remove("hidden");
}

function showHint() {
  document.getElementById("hint-modal").classList.remove("hidden");
}

function closeHint() {
  document.getElementById("hint-modal").classList.add("hidden");
}
