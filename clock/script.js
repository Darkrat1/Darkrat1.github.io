const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');

const toggleDate = document.getElementById('toggle-date');
const toggleSeconds = document.getElementById('toggle-seconds');
const themeSelect = document.getElementById('theme-select');
const timeFont = document.getElementById('time-font');
const dateFont = document.getElementById('date-font');

// SETTINGS STATE
let showDate = true;
let showSeconds = true;

// CLOCK
function updateClock() {
  const now = new Date();

  let hours = now.getUTCHours().toString().padStart(2, '0');
  let minutes = now.getUTCMinutes().toString().padStart(2, '0');
  let seconds = now.getUTCSeconds().toString().padStart(2, '0');

  clockEl.textContent = showSeconds
    ? `${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateClock, 1000);
updateClock();

// SETTINGS BUTTON
settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('hidden');
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

  if (theme === 'seasonal') {
    // SPRING 🌸
    document.body.style.background = "linear-gradient(135deg, #a8e6cf, #dcedc1, #ffd3b6)";
    document.body.style.color = "black";
  }

  if (theme === 'light') {
    document.body.style.background = "white";
    document.body.style.color = "black";
  }

  if (theme === 'dark') {
    document.body.style.background = "#111";
    document.body.style.color = "white";
  }
});

// FONTS
timeFont.addEventListener('change', () => {
  clockEl.style.fontFamily = timeFont.value;
});

dateFont.addEventListener('change', () => {
  dateEl.style.fontFamily = dateFont.value;
});