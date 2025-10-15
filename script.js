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

// 힌트 수정
let timeLeft = 60; // 타이머의 남은 시간을 저장할 변수
let hintUsedThisRound = false; // 이번 라운드에 힌트를 사용했는지 여부

const problems = [
    // --- 1단계 문제들 (5개) ---
    [
        {
            "stage": 1,
            normal: "assets/problems/stage1/1-1o.py",
            error: "assets/problems/stage1/1-1x.py",
            "answers": [
            {"x": 220, "y": 140, "radius": 30},   // pages=0
            {"x": 240, "y": 260, "radius": 30},   // 평균식 len(books)-1
            {"x": 200, "y": 340, "radius": 30}    // "다섯 권"
            ],
            "hint": "pages 값이 0, 평균 계산식 분모 오류, 재고 수가 문자열입니다."
        },
        {
            "stage": 1,
            normal: "assets/problems/stage1/1-2o.py",
            error: "assets/problems/stage1/1-2x.py",
            "answers": [
            {"x": 220, "y": 140, "radius": 30},   // quantity=-3
            {"x": 240, "y": 240, "radius": 30},   // 배송비 문자열
            {"x": 220, "y": 320, "radius": 30}    // 할인율 1.2
            ],
            "hint": "주문 수량이 음수, 배송비가 문자열, 할인율 값이 1 이상입니다."
        },
        {
            "stage": 1,
            normal: "assets/problems/stage1/1-3o.py",
            error: "assets/problems/stage1/1-3x.py",
            "answers": [
            {"x": 220, "y": 140, "radius": 30},   // 999 온도
            {"x": 240, "y": 200, "radius": 30},   // wind에 문자열
            {"x": 220, "y": 280, "radius": 30}    // 평균식 분모 +2
            ],
            "hint": "온도 값이 비정상, 풍속 데이터에 문자열, 평균 계산식 분모가 잘못되었습니다."
        },
        {
            "stage": 1,
            normal: "assets/problems/stage1/1-4o.py",
            error: "assets/problems/stage1/1-4x.py",
            "answers": [
            {"x": 220, "y": 140, "radius": 30},   // balance 음수
            {"x": 240, "y": 220, "radius": 30},   // deposit에 문자열
            {"x": 220, "y": 300, "radius": 30}    // 평균식 분모 -2
            ],
            "hint": "잔액이 음수, 입금 금액이 문자열, 평균 계산식 분모가 잘못되었습니다."
        },
        {
            "stage": 1,
            normal: "assets/problems/stage1/1-5o.py",
            error: "assets/problems/stage1/1-5x.py",
            "answers": [
            {"x": 220, "y": 140, "radius": 30},   // rating=6.5
            {"x": 240, "y": 240, "radius": 30},   // add_rating에 'A'
            {"x": 220, "y": 320, "radius": 30}    // 평균식 분모 +1
            ],
            "hint": "평점이 5를 초과, 평점에 문자열 입력, 평균 계산식 분모가 잘못되었습니다."
        }
    ],

    // --- 2단계 문제들 (5개) ---
    [
        {
            "stage": 2,
            normal: "assets/problems/stage2/2-1o.py",
            error: "assets/problems/stage2/2-1x.py",
            "answers": [
            {"x": 380, "y": 80, "radius": 30},
            {"x": 250, "y": 180, "radius": 30},
            {"x": 200, "y": 240, "radius": 30}
            ],
            "hint": "점수 타입 오류, 평균 계산식의 분모 오류, 등급 조건식의 경계 값 오류입니다."
        },
        {
            "stage": 2,
            normal: "assets/problems/stage2/2-2o.py",
            error: "assets/problems/stage2/2-2x.py",
            "answers": [
            {"x": 320, "y": 60, "radius": 30},
            {"x": 200, "y": 160, "radius": 30},
            {"x": 320, "y": 220, "radius": 30}
            ],
            "hint": "초기 재고 데이터 오류, 함수 반환 값 오류, 재고 업데이트 로직 오류입니다."
        },
        {
            "stage": 2,
            normal: "assets/problems/stage2/2-3o.py",
            error: "assets/problems/stage2/2-3x.py",
            "answers": [
            {"x": 420, "y": 100, "radius": 30},
            {"x": 180, "y": 160, "radius": 30},
            {"x": 240, "y": 240, "radius": 30}
            ],
            "hint": "연령 제한 데이터 타입 오류, 나이 비교 조건식 오류, 총 금액 계산식 오류입니다."
        },
        {
            "stage": 2,
            normal: "assets/problems/stage2/2-4o.py",
            error: "assets/problems/stage2/2-4x.py",
            "answers": [
            {"x": 340, "y": 120, "radius": 30},
            {"x": 460, "y": 140, "radius": 30},
            {"x": 300, "y": 240, "radius": 30}
            ],
            "hint": "계좌 잔액 데이터 오류, 이자율 데이터 타입 오류, 최종 잔액 업데이트 로직 오류입니다."
        },
        {
            "stage": 2,
            normal: "assets/problems/stage2/2-5o.py",
            error: "assets/problems/stage2/2-5x.py",
            "answers": [
            {"x": 340, "y": 80, "radius": 30},
            {"x": 250, "y": 180, "radius": 30},
            {"x": 280, "y": 260, "radius": 30}
            ],
            "hint": "운동 시간 데이터 타입 오류, 함수 내 변수 할당 오류, 총 칼로리 누적 로직 오류입니다."
        }
    ],

    // --- 3단계 문제들 (5개) ---
    [
        {
            "stage": 3,
            normal: "assets/problems/stage3/3-1o.py",
            error: "assets/problems/stage3/3-1x.py",
            "answers": [
            {"x": 380, "y": 80, "radius": 30},
            {"x": 260, "y": 180, "radius": 30},
            {"x": 240, "y": 220, "radius": 30}
            ],
            "hint": "데이터의 타입, 계산식의 연산자를 비교문으로, 함수의 인자 순서가 잘못되었습니다."
        },
        {
            "stage": 3,
            normal: "assets/problems/stage3/3-2o.py",
            error: "assets/problems/stage3/3-2x.py",
            "answers": [
            {"x": 420, "y": 100, "radius": 30},
            {"x": 260, "y": 240, "radius": 30},
            {"x": 280, "y": 300, "radius": 30}
            ],
            "hint": "비정상적인 데이터 값, 리스트에 값을 추가하는 로직, 조건문의 비교 연산자가 잘못되었습니다."
        },
        {
            "stage": 3,
            normal: "assets/problems/stage3/3-3o.py",
            error: "assets/problems/stage3/3-3x.py",
            "answers": [
            {"x": 450, "y": 80, "radius": 30},
            {"x": 260, "y": 240, "radius": 30},
            {"x": 280, "y": 280, "radius": 30}
            ],
            "hint": "데이터의 타입, 계산식의 나눗셈 로직, 조건문의 비교 연산자가 잘못되었습니다."
        },
        {
            "stage": 3,
            normal: "assets/problems/stage3/3-4o.py",
            error: "assets/problems/stage3/3-4x.py",
            "answers": [
            {"x": 520, "y": 40, "radius": 30},
            {"x": 280, "y": 140, "radius": 30},
            {"x": 300, "y": 220, "radius": 30}
            ],
            "hint": "딕셔너리의 키 이름 오타, 가격 비교 연산자, 상태 값의 데이터 타입이 잘못되었습니다."
        },
        {
            "stage": 3,
            normal: "assets/problems/stage3/3-5o.py",
            error: "assets/problems/stage3/3-5x.py",
            "answers": [
            {"x": 420, "y": 120, "radius": 30},
            {"x": 280, "y": 180, "radius": 30},
            {"x": 380, "y": 260, "radius": 30}
            ],
            "hint": "초기 데이터 값 누락, 조건문의 비교 연산자, 계산식의 연산자가 잘못되었습니다."
        }
    ],

    // --- 4단계 문제들 (5개) ---
    [
        {
            "stage": 4,
            normal: "assets/problems/stage4/4-1o.py",
            error: "assets/problems/stage4/4-1x.py",
            "answers": [
            {"x": 480, "y": 80, "radius": 30},
            {"x": 280, "y": 220, "radius": 30},
            {"x": 280, "y": 300, "radius": 30}
            ],
            "hint": "데이터의 타입, 재고 누적 로직, 함수의 반환 값 계산식이 잘못되었습니다."
        },
        {
            "stage": 4,
            normal: "assets/problems/stage4/4-2o.py",
            error: "assets/problems/stage4/4-2x.py",
            "answers": [
            {"x": 460, "y": 140, "radius": 30},
            {"x": 400, "y": 200, "radius": 30},
            {"x": 280, "y": 280, "radius": 30}
            ],
            "hint": "데이터의 타입, 리스트에 값을 추가하는 로직, 합산 시 잘못된 값을 더하는 로직이 있습니다."
        },
        {
            "stage": 4,
            normal: "assets/problems/stage4/4-3o.py",
            error: "assets/problems/stage4/4-3x.py",
            "answers": [
            {"x": 450, "y": 200, "radius": 30},
            {"x": 280, "y": 260, "radius": 30},
            {"x": 240, "y": 360, "radius": 30}
            ],
            "hint": "리스트의 범위를 벗어난 인덱스, 딕셔너리의 잘못된 키, 함수의 반환 값이 잘못되었습니다."
        },
        {
            "stage": 4,
            normal: "assets/problems/stage4/4-4o.py",
            error: "assets/problems/stage4/4-4x.py",
            "answers": [
            {"x": 580, "y": 80, "radius": 30},
            {"x": 300, "y": 220, "radius": 30},
            {"x": 80, "y": 290, "radius": 30}
            ],
            "hint": "데이터의 타입, 데미지 계산식의 연산자, 공격 대상 변수가 잘못되었습니다."
        },
        {
            "stage": 4,
            normal: "assets/problems/stage4/4-5o.py",
            error: "assets/problems/stage4/4-5x.py",
            "answers": [
            {"x": 480, "y": 80, "radius": 30},
            {"x": 350, "y": 180, "radius": 30},
            {"x": 350, "y": 280, "radius": 30}
            ],
            "hint": "데이터의 타입, 리스트에 값을 추가하는 로직, 집계 시 초기 카운트 값이 잘못되었습니다."
        }
    ],

    // --- 5단계 문제들 (5개) ---
    [
        {
            "stage": 5,
            normal: "assets/problems/stage5/5-1o.py",
            error: "assets/problems/stage5/5-1x.py",
            "answers": [
            {"x": 300, "y": 220, "radius": 30},
            {"x": 660, "y": 380, "radius": 30},
            {"x": 680, "y": 500, "radius": 30}
            ],
            "hint": "데이터 포함 여부 확인 로직, 합산하는 데이터의 범위, 특정 조건문의 논리 연산자가 잘못되었습니다."
        },
        {
            "stage": 5,
            normal: "assets/problems/stage5/5-2o.py",
            error: "assets/problems/stage5/5-2x.py",
            "answers": [
            {"x": 420, "y": 200, "radius": 30},
            {"x": 580, "y": 340, "radius": 30},
            {"x": 560, "y": 500, "radius": 30}
            ],
            "hint": "능력치 계산의 기준 변수, 리스트 필터링 조건, 피해량 계산식의 연산자가 잘못되었습니다."
        },
        {
            "stage": 5,
            normal: "assets/problems/stage5/5-3o.py",
            error: "assets/problems/stage5/5-3x.py",
            "answers": [
            {"x": 500, "y": 180, "radius": 30},
            {"x": 280, "y": 320, "radius": 30},
            {"x": 260, "y": 440, "radius": 30}
            ],
            "hint": "규칙 적용 시 조건문의 논리 연산자, 문자열을 만드는 데 사용된 변수, 딕셔너리의 키로 사용된 값이 잘못되었습니다."
        },
        {
            "stage": 5,
            normal: "assets/problems/stage5/5-4o.py",
            error: "assets/problems/stage5/5-4x.py",
            "answers": [
            {"x": 580, "y": 140, "radius": 30},
            {"x": 460, "y": 340, "radius": 30},
            {"x": 440, "y": 420, "radius": 30}
            ],
            "hint": "최저점을 제외하는 조건, 평균을 계산하는 분모, 최종 성적을 환산하는 계산식이 잘못되었습니다."
        },
        {
            "stage": 5,
            normal: "assets/problems/stage5/5-5o.py",
            error: "assets/problems/stage5/5-5x.py",
            "answers": [
            {"x": 400, "y": 180, "radius": 30},
            {"x": 580, "y": 340, "radius": 30},
            {"x": 280, "y": 420, "radius": 30}
            ],
            "hint": "비용 계산식의 연산자, 총 거리를 합산하는 데이터의 범위, 최적 경로를 선택하는 비교 연산자가 잘못되었습니다."
        }
    ]
];


// 화면 전환 함수
function showScreen(screenId) {
    document.querySelectorAll("body > div").forEach(div => {
        div.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
    
    // 게임 화면이 아닐 경우에만 타이머를 중지시킵니다.
    if (screenId !== 'game-screen') {
        clearInterval(timerInterval);
    }
}

// 게임 시작 함수
async function startGame() {
    currentStage = 0;
    loadStage(currentStage);
    showScreen('game-screen');
}

// 타이머 시작 함수
function startGameTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timeLeft = 60; // 새 스테이지 시작 시 시간을 60초로 초기화

    const timerBar = document.getElementById("timer-bar");
    const totalTime = 60; // 전체 시간을 변수로 지정

    timerBar.style.width = '100%';
    timerBar.style.backgroundColor = '#27ae60';

    timerInterval = setInterval(() => {
        timeLeft--;
        // 올바른 시간 비율로 수정 (남은시간 / 전체시간 * 100)
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

// 타이머 재개 함수
function resumeGameTimer() {
    if (timerInterval) clearInterval(timerInterval);

    // timeLeft는 그대로 둔 채 타이머만 다시 시작
    const timerBar = document.getElementById("timer-bar");
    const totalTime = 60; // 전체 시간을 변수로 지정

    timerInterval = setInterval(() => {
        timeLeft--;
        // 올바른 시간 비율로 수정
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
async function loadStage(stageIndex) { // 'async' 추가
    clearMarkers(); // 이전 스테이지의 모든 마커 제거

    // 1. 현재 스테이지에 해당하는 문제 묶음(배열)을 가져옵니다.
    const stageProblems = problems[stageIndex];
    
    // 2. 해당 묶음에서 문제 하나를 무작위로 선택합니다.
    // random
    // const randomIndex = Math.floor(Math.random() * stageProblems.length);
    // const problem = stageProblems[randomIndex];
    const problem = stageProblems[0];

    // 랜덤으로 뽑은 문제를 전역 변수에 저장
    currentProblem = problem;

    // 힌트 상태를 여기서 확실히 초기화합니다.
    hintUsedThisRound = false;
    document.getElementById('hint-button').classList.remove('disabled');

    renderHearts(); // 하트 추가

    problem.answers.forEach(ans => ans.found = false); // 정답 찾음 상태 초기화

    // --- 이 부분이 핵심 변경사항입니다 ---
    // 1. fetch를 사용해 각 경로의 .py 파일 내용을 비동기적으로 불러옵니다.
    const normalResponse = await fetch(problem.normal);
    const normalCode = await normalResponse.text(); // 파일 내용을 텍스트로 변환

    const errorResponse = await fetch(problem.error);
    const errorCode = await errorResponse.text(); // 파일 내용을 텍스트로 변환

    // 2. 불러온 코드 내용을 컨테이너에 삽입합니다.
    const normalContainer = document.getElementById("normal-code-container");
    const errorContainer = document.getElementById("error-code-container");

    // "language-python"으로 변경해야 Prism.js가 파이썬 문법에 맞게 색칠합니다.
    normalContainer.innerHTML = `<pre class="language-python"><code>${normalCode}</code></pre>`;
    errorContainer.innerHTML = `<pre class="language-python"><code>${errorCode}</code></pre>`;
    
    // 3. Prism.js를 실행하여 코드를 하이라이팅합니다.
    Prism.highlightAll();
    // ------------------------------------

    // 테스트용 정답 표시 기능 (코드가 렌더링 된 후 실행)
    showAnswersForTesting();

    document.getElementById("stage-display").textContent = `Stage ${problem.stage}`;
    document.getElementById("hint-text").textContent = problem.hint;

    score = 0;
    wrongAttempts = 0; // 오답 횟수 초기화
    updateGameStats(); // 점수 및 오답 횟수 UI 업데이트

    startGameTimer(); // <<-- 여기서 새 타이머를 시작합니다!
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

// 코드 클릭 처리 함수
function handleCodeClick(event) {
    // 클릭된 코드 컨테이너 자체를 기준으로 삼습니다.
    const clickedWrapper = event.currentTarget;
    const rect = clickedWrapper.getBoundingClientRect();

    // 컨테이너 내의 상대적인 클릭 좌표를 계산합니다.
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // --- 오답 좌표 측정 ---
    console.log(`x: ${Math.round(clickX)}, y: ${Math.round(clickY)}`);
    // -------------------------

    const problem = currentProblem;
    let isCorrectClick = false;

    // 이미 찾은 정답인지 확인하는 변수
    let alreadyFound = false;

    for (const answer of problem.answers) {
        const dx = clickX - answer.x;
        const dy = clickY - answer.y;

        if (Math.sqrt(dx * dx + dy * dy) <= answer.radius) {
            isCorrectClick = true;
            if (!answer.found) {
                answer.found = true; // 정답으로 기록
                score++;
                
                // 정답 위치에 원 그리기
                const normalWrapper = document.getElementById('normal-code-container');
                const errorWrapper = document.getElementById('error-code-container');
                
                drawMarker(answer.x, answer.y, 'correct', normalWrapper);
                drawMarker(answer.x, answer.y, 'correct', errorWrapper);
                
                updateGameStats();

                // 모든 정답을 찾았는지 확인
                if (score >= problem.answers.length) {
                    clearInterval(timerInterval);
                    if (currentStage >= problems.length - 1) {
                        setTimeout(() => showScreen("complete-screen"), 500);
                    } else {
                        setTimeout(() => showScreen("stage-clear-screen"), 500);
                    }
                }
            } else {
                alreadyFound = true; // 이미 찾은 정답임을 표시
            }
            break; 
        }
    }

    // 정답이 아니고, 이미 찾은 곳도 아닐 때만 오답으로 처리
    if (!isCorrectClick && !alreadyFound) {
        wrongAttempts++;
        
        // 하트 이미지 변경
        const hearts = document.querySelectorAll('#life-hearts img');
        if (hearts[wrongAttempts - 1]) {
            hearts[wrongAttempts - 1].src = BROKEN_HEART_IMG_SRC;
        }

        // 오답 위치에 X 표시
        drawMarker(clickX, clickY, 'wrong', clickedWrapper);
        
        // 게임 오버 확인
        if (wrongAttempts >= MAX_WRONG_ATTEMPTS) {
            clearInterval(timerInterval);
            setTimeout(() => showScreen('game-over-screen'), 500);
        }
    }
}

// 다음 단계로 함수
async function nextStage() {
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
    // 올바른 ID와 새로 만든 함수 이름으로 수정합니다.
    document.getElementById("normal-code-container").addEventListener("click", handleCodeClick);
    document.getElementById("error-code-container").addEventListener("click", handleCodeClick);
});

// 테스트용: 정답 위치를 미리 보여주는 함수
function showAnswersForTesting() {
    const problem = currentProblem;
    const wrappers = [
        document.getElementById('normal-code-container'),
        document.getElementById('error-code-container')
    ];

    wrappers.forEach(wrapper => {
        // 코드 컨테이너 기준이므로, 이미지 관련 계산 로직을 제거하고 단순화합니다.
        problem.answers.forEach(answer => {
            const hintMarker = document.createElement('div');
            hintMarker.className = 'test-answer-marker';
            hintMarker.style.left = `${answer.x}px`;
            hintMarker.style.top = `${answer.y}px`;
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

// 힌트 버튼 클릭 처리 함수
function handleHintClick() {
    // 이미 힌트를 사용했다면 아무것도 하지 않음
    if (hintUsedThisRound) return;

    hintUsedThisRound = true; // 힌트 사용으로 기록
    
    const hintButton = document.getElementById('hint-button');
    hintButton.classList.add('disabled'); // 버튼에 비활성화 클래스 추가

    clearInterval(timerInterval); // 타이머 일시정지
    showScreen('hint-screen'); // 힌트 화면 표시
}

// 힌트 화면 닫기 처리 함수
function closeHint() {
    showScreen('game-screen'); // 게임 화면으로 복귀
    resumeGameTimer(); // 타이머 다시 시작
}