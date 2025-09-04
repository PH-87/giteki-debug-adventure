function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showHint() {
  document.getElementById("hint-modal").classList.remove("hidden");
}

function closeHint() {
  document.getElementById("hint-modal").classList.add("hidden");
}
