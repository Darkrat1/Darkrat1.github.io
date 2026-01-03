const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const modeBtn = document.getElementById("mode-btn");

// Alarm setup
const alarm = new Audio("alarm.mp3");
alarm.preload = "auto";
alarm.loop = true; // 🔁 LOOP ALARM

let mode = "timer"; // "timer" or "stopwatch"
let interval = null;
let timeMs = 5 * 60 * 1000; // default 5 minutes

// --------------------
// Utility functions
// --------------------
function parseTime(text) {
  const parts = text.split(":").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return ((parts[0] * 3600) + (parts[1] * 60) + parts[2]) * 1000;
}

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// --------------------
// Editable time input
// --------------------
timeEl.addEventListener("blur", () => {
  const parsed = parseTime(timeEl.textContent.trim());
  if (parsed !== null) {
    timeMs = parsed;
    timeEl.textContent = formatTime(timeMs);
  } else {
    timeEl.textContent = formatTime(timeMs);
  }
});

// --------------------
// Start
// --------------------
startBtn.onclick = () => {
  if (interval) return;

  interval = setInterval(() => {
    if (mode === "timer") {
      timeMs -= 1000;

      if (timeMs <= 0) {
        timeMs = 0;
        timeEl.textContent = formatTime(timeMs);

        clearInterval(interval);
        interval = null;

        alarm.currentTime = 0;
        alarm.play(); // 🔔 LOOPING ALARM
        return;
      }
    } else {
      timeMs += 1000;
    }

    timeEl.textContent = formatTime(timeMs);
  }, 1000);
};

// --------------------
// Pause (stops alarm too)
// --------------------
pauseBtn.onclick = () => {
  clearInterval(interval);
  interval = null;

  alarm.pause();
  alarm.currentTime = 0;
};

// --------------------
// Reset (stops alarm)
// --------------------
resetBtn.onclick = () => {
  clearInterval(interval);
  interval = null;

  alarm.pause();
  alarm.currentTime = 0;

  timeMs = mode === "timer" ? 5 * 60 * 1000 : 0;
  timeEl.textContent = formatTime(timeMs);
};

// --------------------
// Mode toggle (stops alarm)
// --------------------
modeBtn.onclick = () => {
  clearInterval(interval);
  interval = null;

  alarm.pause();
  alarm.currentTime = 0;

  if (mode === "timer") {
    mode = "stopwatch";
    timeMs = 0;
    modeBtn.textContent = "Mode: Stopwatch";
  } else {
    mode = "timer";
    timeMs = 5 * 60 * 1000;
    modeBtn.textContent = "Mode: Timer";
  }

  timeEl.textContent = formatTime(timeMs);
};
