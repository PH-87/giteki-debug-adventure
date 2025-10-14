// 전역 변수
let timerInterval;
let currentStage = 0;
let score = 0;
let wrongAttempts = 0; // 현재 스테이지의 오답 횟수
const MAX_WRONG_ATTEMPTS = 3; // 최대 허용 오답 횟수
let currentProblem; // 랜덤으로 선택된 현재 문제를 저장할 변수

// 하트 이미지 경로 (실제 파일 경로로 수정하세요!)
const HEART_IMG_SRC = 'assets/images/life_normal.PNG';
const BROKEN_HEART_IMG_SRC = 'assets/images/life_die.PNG';

const problems = [
    // --- 1단계 문제들 (5개) ---
    [
        {
            stage: 1,
            normal: "assets/problems/stage1/normal/stage1_normal1.png",
            error: "assets/problems/stage1/error/stage1_error1.png",
            hint: "Hint: 1단계-문제1 힌트입니다.",
            answers: [
                { x: 85, y: 120, radius: 25, found: false },
                { x: 150, y: 200, radius: 30, found: false },
                { x: 290, y: 80, radius: 20, found: false }
            ] 
        },
        {
            stage: 1,
            normal: "assets/problems/stage1/normal/stage1_normal2.png",
            error: "assets/problems/stage1/error/stage1_error2.png",
            hint: "Hint: 1단계-문제2 힌트입니다.",
            answers: [
                { x: 50, y: 50, radius: 20, found: false },
                { x: 200, y: 180, radius: 25, found: false },
                { x: 310, y: 240, radius: 30, found: false }
            ]
        },
        {
            stage: 1,
            normal: "assets/problems/stage1/normal/stage1_normal3.png",
            error: "assets/problems/stage1/error/stage1_error3.png",
            hint: "Hint: 1단계-문제3 힌트입니다.",
            answers: [
                { x: 110, y: 90, radius: 30, found: false },
                { x: 220, y: 150, radius: 20, found: false },
                { x: 350, y: 200, radius: 25, found: false }
            ]
        },
        {
            stage: 1,
            normal: "assets/problems/stage1/normal/stage1_normal4.png",
            error: "assets/problems/stage1/error/stage1_error4.png",
            hint: "Hint: 1단계-문제4 힌트입니다.",
            answers: [
                { x: 90, y: 250, radius: 25, found: false },
                { x: 180, y: 110, radius: 20, found: false },
                { x: 280, y: 60, radius: 30, found: false }
            ]
        },
        {
            stage: 1,
            normal: "assets/problems/stage1/normal/stage1_normal5.png",
            error: "assets/problems/stage1/error/stage1_error5.png",
            hint: "Hint: 1단계-문제5 힌트입니다.",
            answers: [
                { x: 130, y: 70, radius: 30, found: false },
                { x: 250, y: 210, radius: 25, found: false },
                { x: 320, y: 130, radius: 20, found: false }
            ]
        }
    ],

    // --- 2단계 문제들 (5개) ---
    [
        {
            stage: 2,
            normal: "assets/problems/stage2/normal/stage2_normal1.png",
            error: "assets/problems/stage2/error/stage2_error1.png",
            hint: "Hint: 2단계-문제1 힌트입니다.",
            answers: [
                { x: 100, y: 100, radius: 20, found: false },
                { x: 180, y: 220, radius: 25, found: false },
                { x: 300, y: 90, radius: 30, found: false }
            ] 
        },
        {
            stage: 2,
            normal: "assets/problems/stage2/normal/stage2_normal2.png",
            error: "assets/problems/stage2/error/stage2_error2.png",
            hint: "Hint: 2단계-문제2 힌트입니다.",
            answers: [
                { x: 70, y: 140, radius: 30, found: false },
                { x: 210, y: 70, radius: 20, found: false },
                { x: 330, y: 230, radius: 25, found: false }
            ]
        },
        {
            stage: 2,
            normal: "assets/problems/stage2/normal/stage2_normal3.png",
            error: "assets/problems/stage2/error/stage2_error3.png",
            hint: "Hint: 2단계-문제3 힌트입니다.",
            answers: [
                { x: 120, y: 200, radius: 25, found: false },
                { x: 250, y: 100, radius: 30, found: false },
                { x: 340, y: 180, radius: 20, found: false }
            ]
        },
        {
            stage: 2,
            normal: "assets/problems/stage2/normal/stage2_normal4.png",
            error: "assets/problems/stage2/error/stage2_error4.png",
            hint: "Hint: 2단계-문제4 힌트입니다.",
            answers: [
                { x: 60, y: 80, radius: 20, found: false },
                { x: 190, y: 240, radius: 25, found: false },
                { x: 310, y: 120, radius: 30, found: false }
            ]
        },
        {
            stage: 2,
            normal: "assets/problems/stage2/normal/stage2_normal5.png",
            error: "assets/problems/stage2/error/stage2_error5.png",
            hint: "Hint: 2단계-문제5 힌트입니다.",
            answers: [
                { x: 140, y: 160, radius: 30, found: false },
                { x: 260, y: 90, radius: 20, found: false },
                { x: 360, y: 210, radius: 25, found: false }
            ]
        }
    ],

    // --- 3단계 문제들 (5개) ---
    [
        {
            stage: 3,
            normal: "assets/problems/stage3/normal/stage3_normal1.png",
            error: "assets/problems/stage3/error/stage3_error1.png",
            hint: "Hint: 3단계-문제1 힌트입니다.",
            answers: [
                { x: 95, y: 110, radius: 25, found: false },
                { x: 170, y: 190, radius: 30, found: false },
                { x: 280, y: 70, radius: 20, found: false }
            ] 
        },
        {
            stage: 3,
            normal: "assets/problems/stage3/normal/stage3_normal2.png",
            error: "assets/problems/stage3/error/stage3_error2.png",
            hint: "Hint: 3단계-문제2 힌트입니다.",
            answers: [
                { x: 125, y: 215, radius: 30, found: false },
                { x: 235, y: 135, radius: 20, found: false },
                { x: 345, y: 85, radius: 25, found: false }
            ]
        },
        {
            stage: 3,
            normal: "assets/problems/stage3/normal/stage3_normal3.png",
            error: "assets/problems/stage3/error/stage3_error3.png",
            hint: "Hint: 3단계-문제3 힌트입니다.",
            answers: [
                { x: 75, y: 245, radius: 20, found: false },
                { x: 185, y: 65, radius: 25, found: false },
                { x: 295, y: 175, radius: 30, found: false }
            ]
        },
        {
            stage: 3,
            normal: "assets/problems/stage3/normal/stage3_normal4.png",
            error: "assets/problems/stage3/error/stage3_error4.png",
            hint: "Hint: 3단계-문제4 힌트입니다.",
            answers: [
                { x: 105, y: 155, radius: 25, found: false },
                { x: 215, y: 235, radius: 30, found: false },
                { x: 325, y: 55, radius: 20, found: false }
            ]
        },
        {
            stage: 3,
            normal: "assets/problems/stage3/normal/stage3_normal5.png",
            error: "assets/problems/stage3/error/stage3_error5.png",
            hint: "Hint: 3단계-문제5 힌트입니다.",
            answers: [
                { x: 80, y: 95, radius: 30, found: false },
                { x: 195, y: 185, radius: 20, found: false },
                { x: 305, y: 255, radius: 25, found: false }
            ]
        }
    ],

    // --- 4단계 문제들 (5개) ---
    [
        {
            stage: 4,
            normal: "assets/problems/stage4/normal/stage4_normal1.png",
            error: "assets/problems/stage4/error/stage4_error1.png",
            hint: "Hint: 4단계-문제1 힌트입니다.",
            answers: [
                { x: 68, y: 158, radius: 20, found: false },
                { x: 178, y: 248, radius: 25, found: false },
                { x: 318, y: 78, radius: 30, found: false }
            ] 
        },
        {
            stage: 4,
            normal: "assets/problems/stage4/normal/stage4_normal2.png",
            error: "assets/problems/stage4/error/stage4_error2.png",
            hint: "Hint: 4단계-문제2 힌트입니다.",
            answers: [
                { x: 98, y: 88, radius: 30, found: false },
                { x: 208, y: 178, radius: 20, found: false },
                { x: 338, y: 238, radius: 25, found: false }
            ]
        },
        {
            stage: 4,
            normal: "assets/problems/stage4/normal/stage4_normal3.png",
            error: "assets/problems/stage4/error/stage4_error3.png",
            hint: "Hint: 4단계-문제3 힌트입니다.",
            answers: [
                { x: 118, y: 228, radius: 25, found: false },
                { x: 248, y: 108, radius: 30, found: false },
                { x: 358, y: 168, radius: 20, found: false }
            ]
        },
        {
            stage: 4,
            normal: "assets/problems/stage4/normal/stage4_normal4.png",
            error: "assets/problems/stage4/error/stage4_error4.png",
            hint: "Hint: 4단계-문제4 힌트입니다.",
            answers: [
                { x: 78, y: 188, radius: 20, found: false },
                { x: 168, y: 98, radius: 25, found: false },
                { x: 298, y: 258, radius: 30, found: false }
            ]
        },
        {
            stage: 4,
            normal: "assets/problems/stage4/normal/stage4_normal5.png",
            error: "assets/problems/stage4/error/stage4_error5.png",
            hint: "Hint: 4단계-문제5 힌트입니다.",
            answers: [
                { x: 138, y: 128, radius: 30, found: false },
                { x: 228, y: 208, radius: 20, found: false },
                { x: 348, y: 88, radius: 25, found: false }
            ]
        }
    ],

    // --- 5단계 문제들 (5개) ---
    [
        {
            stage: 5,
            normal: "assets/problems/stage5/normal/stage5_normal1.png",
            error: "assets/problems/stage5/error/stage5_error1.png",
            hint: "Hint: 5단계-문제1 힌트입니다.",
            answers: [
                { x: 55, y: 155, radius: 25, found: false },
                { x: 165, y: 235, radius: 30, found: false },
                { x: 275, y: 65, radius: 20, found: false }
            ] 
        },
        {
            stage: 5,
            normal: "assets/problems/stage5/normal/stage5_normal2.png",
            error: "assets/problems/stage5/error/stage5_error2.png",
            hint: "Hint: 5단계-문제2 힌트입니다.",
            answers: [
                { x: 85, y: 105, radius: 20, found: false },
                { x: 195, y: 195, radius: 25, found: false },
                { x: 305, y: 245, radius: 30, found: false }
            ]
        },
        {
            stage: 5,
            normal: "assets/problems/stage5/normal/stage5_normal3.png",
            error: "assets/problems/stage5/error/stage5_error3.png",
            hint: "Hint: 5단계-문제3 힌트입니다.",
            answers: [
                { x: 115, y: 205, radius: 30, found: false },
                { x: 225, y: 115, radius: 20, found: false },
                { x: 335, y: 175, radius: 25, found: false }
            ]
        },
        {
            stage: 5,
            normal: "assets/problems/stage5/normal/stage5_normal4.png",
            error: "assets/problems/stage5/error/stage5_error4.png",
            hint: "Hint: 5단계-문제4 힌트입니다.",
            answers: [
                { x: 65, y: 175, radius: 25, found: false },
                { x: 175, y: 85, radius: 30, found: false },
                { x: 285, y: 225, radius: 20, found: false }
            ]
        },
        {
            stage: 5,
            normal: "assets/problems/stage5/normal/stage5_normal5.png",
            error: "assets/problems/stage5/error/stage5_error5.png",
            hint: "Hint: 5단계-문제5 힌트입니다.",
            answers: [
                { x: 145, y: 135, radius: 20, found: false },
                { x: 235, y: 215, radius: 25, found: false },
                { x: 355, y: 95, radius: 30, found: false }
            ]
        }
    ]
];


// 화면 전환 함수
function showScreen(screenId) {
    document.querySelectorAll("body > div").forEach(div => {
        div.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");

    if (screenId === 'game-screen') {
        startGameTimer();
    } else {
        clearInterval(timerInterval); // 게임 화면이 아니면 타이머 중지
    }
}

// 게임 시작 함수
function startGame() {
    currentStage = 0;
    loadStage(currentStage);
    showScreen('game-screen');
}

// 타이머 시작 함수
function startGameTimer() {
    if (timerInterval) clearInterval(timerInterval);

    const timerBar = document.getElementById("timer-bar");
    let timeLeft = 60;
    const totalTime = 60;

    timerBar.style.width = '100%';
    timerBar.style.backgroundColor = '#27ae60';

    timerInterval = setInterval(() => {
        timeLeft--;
        timerBar.style.width = `${(timeLeft / totalTime) * 100}%`;

        if (timeLeft <= 10) {
            timerBar.style.backgroundColor = '#e74c3c';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showScreen('game-over-screen');
        }
    }, 1000);
}

// 스테이지 로드 함수
function loadStage(stageIndex) {
    clearMarkers(); // 이전 스테이지의 모든 마커 제거

    // 1. 현재 스테이지에 해당하는 문제 묶음(배열)을 가져옵니다.
    const stageProblems = problems[stageIndex];
    
    // 2. 해당 묶음에서 문제 하나를 무작위로 선택합니다.
    const randomIndex = Math.floor(Math.random() * stageProblems.length);
    const problem = stageProblems[randomIndex];
    
    // 랜덤으로 뽑은 문제를 전역 변수에 저장
    currentProblem = problem;

    renderHearts(); // 하트 추가

    problem.answers.forEach(ans => ans.found = false); // 정답 찾음 상태 초기화

    const normalImage = document.getElementById("normal-image");
    const errorImage = document.getElementById("error-image");

    normalImage.src = problem.normal;
    errorImage.src = problem.error;

    // 테스트용 정답 표시 기능 (이미지가 로드된 후 실행)
    errorImage.onload = showAnswersForTesting;

    document.getElementById("stage-display").textContent = `Stage ${problem.stage}`;
    document.getElementById("hint-text").textContent = problem.hint;

    score = 0;
    wrongAttempts = 0; // 오답 횟수 초기화
    updateGameStats(); // 점수 및 오답 횟수 UI 업데이트

}

// 점수 및 오답 횟수 UI 업데이트 함수
function updateGameStats() {
    const problem = currentProblem;
    // 점수 표시만 남깁니다.
    document.getElementById("score").textContent = `${score}/${problem.answers.length}`;
}

// 마커 그리기 (원 또는 X) 함수
function drawMarker(x, y, type, targetWrapper) {
    const marker = document.createElement('div');
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;

    if (type === 'correct') {
        marker.className = 'click-indicator';
    } else if (type === 'wrong') {
        marker.className = 'error-marker';
    }
    targetWrapper.appendChild(marker);
}

// 화면에 그려진 모든 마커(원, X, 테스트용 파란 원) 제거 함수
function clearMarkers() {
    document.querySelectorAll('.click-indicator, .error-marker, .test-answer-marker').forEach(marker => marker.remove());
}

// 이미지 클릭 처리 함수
function handleImageClick(event) {
    const clickedImageElement = event.target;
    const clickedImageWrapper = clickedImageElement.parentElement;

    const wrapperRect = clickedImageWrapper.getBoundingClientRect();
    const markerLeft = event.clientX - wrapperRect.left;
    const markerTop = event.clientY - wrapperRect.top;

    const imageRect = clickedImageElement.getBoundingClientRect();
    const scaleX = clickedImageElement.naturalWidth / imageRect.width;
    const scaleY = clickedImageElement.naturalHeight / imageRect.height;
    
    const clickX = (event.clientX - imageRect.left) * scaleX;
    const clickY = (event.clientY - imageRect.top) * scaleY;
    
    const problem = currentProblem;
    let isCorrectClick = false;

    for (const answer of problem.answers) {
        const dx = clickX - answer.x;
        const dy = clickY - answer.y;

        if (Math.sqrt(dx * dx + dy * dy) <= answer.radius) {
            isCorrectClick = true;
            if (!answer.found) {
                answer.found = true;
                score++;
                
                const wrappers = [
                    document.getElementById('normal-image').parentElement,
                    document.getElementById('error-image').parentElement
                ];

                wrappers.forEach(wrapper => {
                    const targetWrapperRect = wrapper.getBoundingClientRect();
                    const targetMarkerLeft = event.clientX - targetWrapperRect.left;
                    const targetMarkerTop = event.clientY - targetWrapperRect.top;
                    drawMarker(targetMarkerLeft, targetMarkerTop, 'correct', wrapper);
                });
                
                updateGameStats();

                // --- 이 부분이 수정되었습니다! ---
                if (score >= problem.answers.length) {
                    clearInterval(timerInterval);
                    
                    // 마지막 스테이지인지 확인
                    if (currentStage >= problems.length - 1) {
                        // 마지막 스테이지라면, 바로 최종 클리어 화면으로 이동
                        setTimeout(() => showScreen("complete-screen"), 500);
                    } else {
                        // 마지막이 아니라면, 기존처럼 단계 클리어 화면으로 이동
                        setTimeout(() => showScreen("stage-clear-screen"), 500);
                    }
                }
                // ------------------------------
            }
            break; 
        }
    }

    if (!isCorrectClick) {
        wrongAttempts++;

        // 1. 하트 이미지들을 모두 가져옵니다.
        const hearts = document.querySelectorAll('#life-hearts img');
        // 2. 틀린 횟수에 해당하는 하트 이미지의 src를 깨진 하트로 변경합니다.
        if (hearts[wrongAttempts - 1]) {
            hearts[wrongAttempts - 1].src = BROKEN_HEART_IMG_SRC;
        }

        drawMarker(markerLeft, markerTop, 'wrong', clickedImageWrapper);
        updateGameStats();
        

        if (wrongAttempts >= MAX_WRONG_ATTEMPTS) {
            clearInterval(timerInterval);
            setTimeout(() => showScreen('game-over-screen'), 500);
        }
    }
}

// 다음 단계로 함수
function nextStage() {
    currentStage++;
    if (currentStage < problems.length) {
        loadStage(currentStage);
        showScreen("game-screen");
    } else {
        showScreen("complete-screen");
    }
}

// DOM이 로드된 후 실행될 코드
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
    document.getElementById("normal-image").addEventListener("click", handleImageClick);
    document.getElementById("error-image").addEventListener("click", handleImageClick);
});

// 테스트용: 정답 위치를 미리 보여주는 함수
function showAnswersForTesting() {
    const problem = currentProblem;
    const wrappers = [
        document.getElementById('normal-image').parentElement,
        document.getElementById('error-image').parentElement
    ];

    wrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        const rect = img.getBoundingClientRect();
        if (rect.width === 0) return;

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        problem.answers.forEach(answer => {
            const displayX = answer.x / scaleX;
            const displayY = answer.y / scaleY;

            const markerLeft = displayX + img.offsetLeft;
            const markerTop = displayY + img.offsetTop;

            const hintMarker = document.createElement('div');
            hintMarker.className = 'test-answer-marker';
            hintMarker.style.left = `${markerLeft}px`;
            hintMarker.style.top = `${markerTop}px`;
            wrapper.appendChild(hintMarker);
        });
    });
}

// 하트 생명을 화면에 생성하는 함수
function renderHearts() {
    const heartsContainer = document.getElementById('life-hearts');
    heartsContainer.innerHTML = ''; // 기존 하트들을 초기화

    for (let i = 0; i < MAX_WRONG_ATTEMPTS; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = HEART_IMG_SRC;
        heartsContainer.appendChild(heartImg);
    }
}