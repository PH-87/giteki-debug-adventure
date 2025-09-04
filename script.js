function showScreen(screenId) {
    // 모든 화면에서 'active' 클래스 제거
    const screens = document.querySelectorAll("body > div");
    screens.forEach(s => s.classList.remove("active"));

    // 선택한 화면에 'active' 클래스 추가
    document.getElementById(screenId).classList.add("active");

    if (screenId === 'game-screen') {
        startGameTimer();
    }
}

function startGameTimer() {
    const timerBar = document.getElementById("timer-bar");
    let timeLeft = 10;
    timerBar.style.width = '100%';
    timerBar.style.backgroundColor = '#27ae60';

    const timerInterval = setInterval(() => {
        timeLeft -= 1;
        const widthPercentage = (timeLeft / 10) * 100;
        timerBar.style.width = `${widthPercentage}%`;

        if (timeLeft <= 3) {
            timerBar.style.backgroundColor = '#e74c3c'; // 남은 시간이 3초 이하면 빨간색으로 변경
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // alert('시간 초과! 게임 실패!');
            // showScreen('game-over-screen'); 와 같은 함수로 게임오버 화면을 보여줄 수 있습니다.
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
});
