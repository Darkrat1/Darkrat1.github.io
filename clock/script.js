const clockEl = document.getElementById('clock');
const toggleBtn = document.getElementById('toggle-bg');
let isWinter = false;

// Update UTC clock every second
function updateClock() {
  const now = new Date();
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Toggle background: white ↔ winter gradient
toggleBtn.addEventListener('click', () => {
  if (!isWinter) {
    document.body.classList.add("winter");
  } else {
    document.body.classList.remove("winter");
  }
  isWinter = !isWinter;
});
