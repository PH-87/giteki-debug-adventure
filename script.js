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

// 오답 처리
let wrongClicks = []; // 이번 라운드에 클릭한 오답들의 좌표를 저장할 배열
const WRONG_CLICK_RADIUS = 30; // 오답으로 처리된 영역 주변을 막을 범위 (px)

// 데이터를 불러와서 채울 빈 배열
let problems = []; 


// 화면 전환 함수
function showScreen(screenId) {
    document.querySelectorAll("body > div").forEach(div => {
        div.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
    
    /// 게임 화면이 아닌 경우 타이머를 중지시킵니다.
    if (screenId !== 'game-screen') {
        clearInterval(timerInterval);
    }

    // 게임이 완전히 끝나는 화면에서만 BGM을 정지 및 초기화합니다.
    if (screenId === 'game-over-screen' || screenId === 'complete-screen' || screenId === 'start-screen') {
        const bgm = document.getElementById('bgm');
        bgm.pause();
        bgm.currentTime = 0;
    }
}

// 게임 시작 함수
async function startGame() {
    currentStage = 0;
    await loadStage(currentStage); // await를 추가하여 loadStage가 끝날 때까지 기다립니다.
    showScreen('game-screen');
    document.getElementById('bgm').play(); // 화면이 표시된 후 BGM을 재생합니다.
}

// 타이머 시작 함수
function startGameTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timeLeft = 30; // 새 스테이지 시작 시 시간 초기화

    const timerBar = document.getElementById("timer-bar");
    const totalTime = 30; // 전체 시간을 변수로 지정

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
    const totalTime = 30; // 전체 시간을 변수로 지정

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
    const randomIndex = Math.floor(Math.random() * stageProblems.length);
    const problem = stageProblems[randomIndex];

    // 랜덤으로 뽑은 문제를 전역 변수에 저장
    currentProblem = problem;

    // 새 스테이지가 시작되면 오답 기록 초기화
    wrongClicks = []; 

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


    // 테스트용 정답 표시 기능 (코드가 렌더링 된 후 실행)
    // showAnswersForTesting();

    document.getElementById("stage-display").textContent = `STAGE ${problem.stage}`;
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

                // 정답 효과음 재생
                const sound = document.getElementById('sound-correct');
                sound.currentTime = 0;
                sound.play();
                
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
    // 이미 클릭된 오답 영역 근처인지 확인
    for (const wc of wrongClicks) {
        const dx = clickX - wc.x;
        const dy = clickY - wc.y;
        if (Math.sqrt(dx * dx + dy * dy) < WRONG_CLICK_RADIUS) {
            return; // 이미 처리된 오답 영역이므로 아무것도 안 하고 함수 종료
        }
    }

    // 새로운 오답으로 처리
    wrongAttempts++;
    wrongClicks.push({ x: clickX, y: clickY }); // 현재 오답 위치를 기록

    // 오답 효과음 재생
    const sound = document.getElementById('sound-wrong');
    sound.currentTime = 0;
    sound.play();
    
    // 하트 이미지 변경 및 애니메이션
    const hearts = document.querySelectorAll('#life-hearts img');
    const targetHeart = hearts[wrongAttempts - 1]; // 변경될 하트

    if (targetHeart) {
        // 1. 하트에 shake 클래스를 추가하여 애니메이션을 시작합니다.
        targetHeart.classList.add('shake');

        // 2. 애니메이션이 끝난 후(0.5초 뒤) 이미지를 바꾸고,
        //    다음에도 애니메이션이 작동하도록 클래스를 제거합니다.
        setTimeout(() => {
            targetHeart.src = BROKEN_HEART_IMG_SRC;
            targetHeart.classList.remove('shake');
        }, 500); // 500ms = 0.5초 (CSS 애니메이션 시간과 일치)
    }

    // 오답 위치에 X 표시 (양쪽에 모두)
    const normalWrapper = document.getElementById('normal-code-container');
    const errorWrapper = document.getElementById('error-code-container');
    
    drawMarker(clickX, clickY, 'wrong', normalWrapper);
    drawMarker(clickX, clickY, 'wrong', errorWrapper);
    
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
        await loadStage(currentStage); // await 추가
        showScreen("game-screen");
    } else {
        showScreen("complete-screen");
    }
}

// 게임 전체를 초기화하고 시작하는 함수
async function initializeGame() {
    try {
        // 1. fetch를 사용해 JSON 파일로부터 게임 데이터를 불러옵니다.
        const response = await fetch('assets/problems.json');
        if (!response.ok) {
            throw new Error('데이터 파일(problems.json)을 불러오는 데 실패했습니다.');
        }
        problems = await response.json(); // 불러온 데이터를 problems 변수에 저장

        // 2. 데이터 로딩이 완료되면, 시작 화면을 보여줍니다.
        showScreen('start-screen');
        
        // 3. 코드 컨테이너에 클릭 이벤트를 연결합니다.
        document.getElementById("normal-code-container").addEventListener("click", handleCodeClick);
        document.getElementById("error-code-container").addEventListener("click", handleCodeClick);

    } catch (error) {
        console.error("게임 초기화 중 오류 발생:", error);
        // 사용자에게 데이터 로딩 실패를 알려주는 메시지를 화면에 표시할 수도 있습니다.
        document.body.innerHTML = '<h2>게임을 불러오는 데 실패했습니다.</h2><p>페이지를 새로고침하거나 관리자에게 문의하세요.</p>';
    }
}

// 페이지의 모든 내용이 로드되면 게임 초기화를 시작합니다.
window.onload = initializeGame;

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