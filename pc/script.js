const FIREBASE_URL =
  "https://pc-monitor-12345a-default-rtdb.firebaseio.com/pc.json";

function updateStatus() {
  fetch(FIREBASE_URL)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.lastSeen) {
        showOffline();
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      const secondsAgo = now - data.lastSeen;

      if (secondsAgo < 60) {
        document.getElementById("status").innerText = "🟢 PC ONLINE";
      } else {
        showOffline();
      }

      document.getElementById("details").innerText =
        "Last seen: " + secondsAgo + " seconds ago";
    })
    .catch(showOffline);
}

function showOffline() {
  document.getElementById("status").innerText = "🔴 PC OFFLINE";
  document.getElementById("details").innerText = "";
}

updateStatus();
setInterval(updateStatus, 10000);
