
const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');

const toggleDate = document.getElementById('toggle-date');
const toggleSeconds = document.getElementById('toggle-seconds');
const themeSelect = document.getElementById('theme-select');
const timeFont = document.getElementById('time-font');
const dateFont = document.getElementById('date-font');

const settingsBtn = document.getElementById('settings-btn');
const overlay = document.getElementById('settings-overlay');

// SETTINGS STATE
let showDate = true;
let showSeconds = true;

// DEFAULT FONTS
dateEl.style.fontFamily = dateFont.value;

// CLOCK
function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  clockEl.textContent = showSeconds
    ? `${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}`;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

updateClock();
setInterval(updateClock, 1000);

// SETTINGS PANEL
settingsBtn.addEventListener('click', () => {
  overlay.classList.remove('hidden');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.add('hidden');
  }
});

// DATE TOGGLE
toggleDate.addEventListener('change', () => {
  showDate = toggleDate.checked;
  dateEl.style.display = showDate ? 'block' : 'none';
  dateFont.disabled = !showDate;
});

// SECONDS TOGGLE
toggleSeconds.addEventListener('change', () => {
  showSeconds = toggleSeconds.checked;
  updateClock();
});

// AUTOMATIC SEASON DETECTION
function getSeason(date = new Date()) {
  const month = date.getMonth(); // January = 0

  if (month >= 2 && month <= 4) {
    return 'spring';
  }

  if (month >= 5 && month <= 7) {
    return 'summer';
  }

  if (month >= 8 && month <= 10) {
    return 'autumn';
  }

  return 'winter';
}

// THEME APPLICATION
function applyTheme() {
  const theme = themeSelect.value;
  const panel = document.getElementById('settings-panel');

  // Remove all previously applied themes
  document.body.classList.remove(
    'seasonal-spring',
    'seasonal-summer',
    'seasonal-autumn',
    'seasonal-winter',
    'theme-light',
    'theme-dark'
  );

  // Clear old inline styles so CSS controls the appearance
  document.body.style.background = '';
  document.body.style.color = '';
  panel.style.background = '';
  panel.style.color = '';

  if (theme === 'seasonal') {
    const season = getSeason();
    document.body.classList.add(`seasonal-${season}`);
  }

  if (theme === 'light') {
    document.body.classList.add('theme-light');
  }

  if (theme === 'dark') {
    document.body.classList.add('theme-dark');
  }

  // Save the selected mode
  localStorage.setItem('clockTheme', theme);
}

// THEME SELECTOR
const savedTheme = localStorage.getItem('clockTheme');

if (savedTheme && ['seasonal', 'light', 'dark'].includes(savedTheme)) {
  themeSelect.value = savedTheme;
} else {
  themeSelect.value = 'seasonal';
}

themeSelect.addEventListener('change', applyTheme);

applyTheme();

// Check regularly in case the season changes while the page is open
setInterval(() => {
  if (themeSelect.value === 'seasonal') {
    applyTheme();
  }
}, 60000);

// TIME FONT
timeFont.addEventListener('change', () => {
  clockEl.style.fontFamily = timeFont.value;
});

// DATE FONT
dateFont.addEventListener('change', () => {
  dateEl.style.fontFamily = dateFont.value;
});
