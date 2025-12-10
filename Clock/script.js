const clockEl = document.getElementById('clock');
const toggleBtn = document.getElementById('toggle-bg');
let isImage = false;

// Function to update UTC time every second
function updateClock() {
  const now = new Date();
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
  clockEl.textContent = `${hours}:${minutes}:${seconds} UTC`;
}
setInterval(updateClock, 1000);
updateClock(); // initial call

// Toggle background
toggleBtn.addEventListener('click', () => {
  if (!isImage) {
    document.body.style.backgroundImage = "url('background.jpg')"; // add an image if you want
    document.body.style.backgroundColor = "";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
  isImage = !isImage;
});
