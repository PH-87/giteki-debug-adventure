// 전역 변수
let timerInterval;
let currentStage = 0;
let score = 0;

// 문제 데이터 (스테이지별)
const problems = [
    {
        stage: 1,
        normal: "assets/problems/stage1/normal/stage1_normal.png",
        error: "assets/problems/stage1/error/stage1_error.png",
        hint: "Hint: 화면 오른쪽 상단을 확인해 보세요!",
        answers: [
            { x: 250, y: 100, radius: 30 }
        ]
    },
    {
        stage: 2,
        normal: "assets/problems/stage2/normal/stage2_normal.png",
        error: "assets/problems/stage2/error/stage2_error.png",
        hint: "Hint: 버튼의 색이 다른 것 같아요!",
        answers: [
            { x: 180, y: 200, radius: 25 }
        ]
    }
];

// 화면 전환 함수
function showScreen(screenId) {
    const screens = document.querySelectorAll("body > div");
    screens.forEach(s => {
        s.classList.remove("active");
        s.classList.add("hidden");
    });

    document.getElementById(screenId).classList.add("active");
    document.getElementById(screenId).classList.remove("hidden");

    if (screenId === 'game-screen') {
        startGameTimer();
    }
}

// 게임 시작
function startGame() {
    currentStage = 0;
    loadStage(currentStage);
    showScreen('game-screen');
}

// 타이머 시작
function startGameTimer() {
    // 이미 실행 중이면 초기화
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const timerBar = document.getElementById("timer-bar");
    let timeLeft = 60; // 60초 제한
    const totalTime = 60;

    timerBar.style.width = '100%';
    timerBar.style.backgroundColor = '#27ae60';

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        const widthPercentage = (timeLeft / totalTime) * 100;
        timerBar.style.width = `${widthPercentage}%`;

        if (timeLeft <= 10) {
            timerBar.style.backgroundColor = '#e74c3c';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // 게임 오버 화면으로 이동
            showScreen('game-over-screen');
        }
    }, 1000);
}


// 스테이지 로드
function loadStage(stageIndex) {
    const problem = problems[stageIndex];

    // 이미지, 힌트, 점수 초기화
    document.getElementById("normal-image").src = problem.normal;
    document.getElementById("error-image").src = problem.error;
    document.getElementById("stage").textContent = `Stage ${problem.stage}`;
    document.getElementById("hint-text").textContent = problem.hint;

    score = 0;
    document.getElementById("score").textContent = `${score}/${problem.answers.length}`;
}

// 오류 이미지 클릭 판정
document.getElementById("error-image").addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const problem = problems[currentStage];
    problem.answers.forEach(answer => {
        const dx = x - answer.x;
        const dy = y - answer.y;
        if (Math.sqrt(dx*dx + dy*dy) <= answer.radius) {
            score++;
            document.getElementById("score").textContent = `${score}/${problem.answers.length}`;

            // 모든 답을 찾으면 스테이지 클리어
            if (score >= problem.answers.length) {
                clearInterval(timerInterval);
                showScreen("stage-clear-screen");
            }
        }
    });
});

// 다음 단계
function nextStage() {
    currentStage++;
    if (currentStage < problems.length) {
        loadStage(currentStage);
        showScreen("game-screen");
    } else {
        showScreen("complete-screen");
    }
}

// 첫 화면 표시
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
});
