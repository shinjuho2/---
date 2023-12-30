document.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.querySelector('.stop-watch-timer');
  const lapListElement = document.querySelector('.stop-watch-lap-list');
  const lapTemplate = document.getElementById('stop-watch-lap');

  let isRunning = false;
  let startTime;
  let lapNumber = 1;

  function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    timerElement.textContent = formattedTime;
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = (milliseconds % 1000).toString().padStart(3, '0');
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millisecondsFormatted}`;
  }

  function lap() {
    const lapTime = Date.now() - startTime;
    const lapElement = document.importNode(lapTemplate.content, true);
    lapElement.querySelector('li').textContent = `Lap ${lapNumber} : ${formatTime(lapTime)}`;
    lapListElement.appendChild(lapElement);
    lapNumber++;
  }

  function startStopwatch() {
    startTime = Date.now();
    isRunning = true;
    lapNumber = 1;

    function update() {
      if (isRunning) {
        updateTimer();
        requestAnimationFrame(update);
      }
    }

    update();
  }

  function toggleStopwatch() {
    if (isRunning) {
      isRunning = false;
    } else {
      startStopwatch();
    }
  }

  function resetStopwatch() {
    isRunning = false;
    timerElement.textContent = '00:00.000';
    lapListElement.innerHTML = '';
    lapNumber = 1;
  }

  function handleControlButtonClick(event) {
    const action = event.target.dataset.action;

    switch (action) {
      case 'toggle':
        toggleStopwatch();
        break;
      case 'lap':
        lap();
        break;
      case 'reset':
        resetStopwatch();
        break;
    }
  }

  const controlButtons = document.createElement('div');
  controlButtons.classList.add('stop-watch-control-buttons');

  const toggleButton = document.createElement('button');
  toggleButton.textContent = '시작/정지';
  toggleButton.dataset.action = 'toggle';
  toggleButton.addEventListener('click', handleControlButtonClick);

  const lapButton = document.createElement('button');
  lapButton.textContent = '기록';
  lapButton.dataset.action = 'lap';
  lapButton.addEventListener('click', handleControlButtonClick);

  const resetButton = document.createElement('button');
  resetButton.textContent = '초기화';
  resetButton.dataset.action = 'reset';
  resetButton.addEventListener('click', handleControlButtonClick);

  controlButtons.appendChild(toggleButton);
  controlButtons.appendChild(lapButton);
  controlButtons.appendChild(resetButton);

  const controlContainer = document.querySelector('.stop-watch-control');
  controlContainer.appendChild(controlButtons);
});
