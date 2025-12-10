const toggleBtn = document.getElementById('toggle-bg');
let isImage = false;

toggleBtn.addEventListener('click', () => {
  if (!isImage) {
    document.body.style.backgroundImage = "url('background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  } else {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "white";
  }
  isImage = !isImage;
});
