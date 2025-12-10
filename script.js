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
//  DAILY BIBLE VERSE (stable)
// ==========================

// We save the verse for the whole day using localStorage
const verseKey = "dailyBibleVerse";
const dateKey = "dailyBibleVerseDate";
const todayString = today.toISOString().slice(0, 10); // YYYY-MM-DD

function setBibleVerse(text) {
  document.getElementById("bible-verse").textContent = text;
}

// Check if we already have today's verse
if (localStorage.getItem(dateKey) === todayString) {
  setBibleVerse(localStorage.getItem(verseKey));
} else {
  // Fetch a new verse for today
  fetch("https://labs.bible.org/api/?passage=random&type=json")
    .then(res => res.json())
    .then(data => {
      const v = data[0];
      const verseText = `"${v.text}" — ${v.bookname} ${v.chapter}:${v.verse}`;

      // Save it
      localStorage.setItem(verseKey, verseText);
      localStorage.setItem(dateKey, todayString);

      setBibleVerse(verseText);
    })
    .catch(() => {
      setBibleVerse("Bible verse unavailable.");
    });
}

// ==========================
//     DAILY QUOTE (working)
// ==========================

// USING: ZenQuotes JSON — reliable, HTTPS valid
fetch("https://zenquotes.io/api/today")
  .then(res => res.json())
  .then(data => {
    const quote = data[0];
    document.getElementById("quote").textContent =
      `"${quote.q}" — ${quote.a}`;
  })
  .catch(() => {
    document.getElementById("quote").textContent =
      "Quote unavailable today.";
  });

// ==========================
//     TODAY'S HOLIDAY
// ==========================

const year = today.getFullYear();
const monthNum = today.getMonth() + 1;
const dayNum = today.getDate();

fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
  .then(res => res.json())
  .then(holidays => {
    const match = holidays.find(h => {
      const date = new Date(h.date);
      return (
        date.getMonth() + 1 === monthNum &&
        date.getDate() === dayNum
      );
    });

    document.getElementById("event").textContent =
      match ? match.localName : "No major public holiday today.";
  });
