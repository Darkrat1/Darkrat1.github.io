
// --- DATE ---
const dateElement = document.getElementById("today-date");
const today = new Date();
const day = today.toLocaleString('en-US', { day: 'numeric' });
const month = today.toLocaleString('en-US', { month: 'long' });
dateElement.textContent = `${day} ${month}`;

// --- BIBLE VERSE ---
fetch("https://labs.bible.org/api/?passage=random&type=json")
  .then(res => res.json())
  .then(data => {
    const verse = data[0];
    document.getElementById("bible-verse").textContent =
      `"${verse.text}" — ${verse.bookname} ${verse.chapter}:${verse.verse}`;
  });

// --- DAILY QUOTE ---
fetch("https://api.quotable.io/random")
  .then(res => res.json())
  .then(data => {
    document.getElementById("quote").textContent =
      `"${data.content}" — ${data.author}`;
  });

// --- TODAY'S HOLIDAY ---
const year = today.getFullYear();
const monthNum = today.getMonth() + 1;
const dayNum = today.getDate();

fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
  .then(res => res.json())
  .then(holidays => {
    const match = holidays.find(h => {
      const date = new Date(h.date);
      return date.getMonth() + 1 === monthNum && date.getDate() === dayNum;
    });
    document.getElementById("event").textContent =
      match ? match.localName : "No major public holiday today.";
  });
