// --- DATE AS TITLE + TAB TITLE ---
const title = document.getElementById("page-title");
const tabTitle = document.getElementById("tab-title");

const today = new Date();
const day = today.toLocaleString('en-US', { day: 'numeric' });
const month = today.toLocaleString('en-US', { month: 'long' });
const formatted = `${day} ${month}`;

title.textContent = formatted;
tabTitle.textContent = formatted;

// ==========================
//  DAILY BIBLE VERSE (once per day)
// ==========================
const verseKey = "dailyBibleVerse";
const dateKey = "dailyBibleVerseDate";
const todayString = today.toISOString().slice(0, 10); // YYYY-MM-DD

function setBibleVerse(text) {
  document.getElementById("bible-verse").textContent = text;
}

if (localStorage.getItem(dateKey) === todayString) {
  setBibleVerse(localStorage.getItem(verseKey));
} else {
  fetch("https://labs.bible.org/api/?passage=random&type=json")
    .then(res => res.json())
    .then(data => {
      const v = data[0];
      const verseText = `"${v.text}" — ${v.bookname} ${v.chapter}:${v.verse}`;
      localStorage.setItem(verseKey, verseText);
      localStorage.setItem(dateKey, todayString);
      setBibleVerse(verseText);
    })
    .catch(() => {
      setBibleVerse("Bible verse unavailable.");
    });
}

// ==========================
// DAILY QUOTE (CORS-safe, no SSL issue)
// ==========================
fetch("https://api.adviceslip.com/advice")
  .then(res => res.json())
  .then(data => {
    document.getElementById("quote").textContent =
      `"${data.slip.advice}"`;
  })
  .catch(() => {
    document.getElementById("quote").textContent =
      "Quote unavailable today.";
  });

// ==========================
//     TODAY'S EVENT / HOLIDAY
// ==========================
const monthNum = today.getMonth() + 1;
const dayNum = today.getDate();

// Using "On This Day" API (historical events)
fetch(`https://byabbe.se/on-this-day/${monthNum}/${dayNum}/events.json`)
  .then(res => res.json())
  .then(data => {
    const event = data.events[0]; // first historical event
    document.getElementById("event").textContent =
      event ? event.description : "No notable events today.";
  })
  .catch(() => {
    document.getElementById("event").textContent =
      "No events available today.";
  });
