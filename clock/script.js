const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');

const toggleDate = document.getElementById('toggle-date');
const toggleSeconds = document.getElementById('toggle-seconds');
const themeSelect = document.getElementById('theme-select');
const timeFont = document.getElementById('time-font');
const dateFont = document.getElementById('date-font');

// Set default date font on load
dateEl.style.fontFamily = "'Trebuchet MS', sans-serif";

// SETTINGS STATE
let showDate = true;
let showSeconds = true;

// CLOCK
function updateClock() {
  const now = new Date(); // uses the computer's time
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
    // format numbers properly
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  clockEl.textContent = showSeconds
    ? `${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateClock, 1000);
updateClock();

const settingsBtn = document.getElementById('settings-btn');
const overlay = document.getElementById('settings-overlay');

settingsBtn.addEventListener('click', () => {
  overlay.classList.remove('hidden');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.add('hidden');
  }
});

// TOGGLES
toggleDate.addEventListener('change', () => {
  showDate = toggleDate.checked;
  dateEl.style.display = showDate ? 'block' : 'none';

  // Grey out date font option
  dateFont.disabled = !showDate;
});

toggleSeconds.addEventListener('change', () => {
  showSeconds = toggleSeconds.checked;
});

// THEME SWITCH
themeSelect.addEventListener('change', () => {
  const theme = themeSelect.value;

  const panel = document.getElementById('settings-panel');

  if (theme === 'seasonal') {
    document.body.style.background = "linear-gradient(135deg, #a8e6cf, #dcedc1, #ffd3b6)";
    document.body.style.color = "black";

    panel.style.background = "white";
    panel.style.color = "black";
  }

  if (theme === 'light') {
    document.body.style.background = "white";
    document.body.style.color = "black";

    panel.style.background = "white";
    panel.style.color = "black";
  }

  if (theme === 'dark') {
    document.body.style.background = "#111";
    document.body.style.color = "white";

    // 👇 THIS is what you wanted
    panel.style.background = "#1e1e1e";
    panel.style.color = "white";
  }
});

// FONTS
timeFont.addEventListener('change', () => {
  clockEl.style.fontFamily = timeFont.value;
});

dateFont.addEventListener('change', () => {
  dateEl.style.fontFamily = dateFont.value;
});
