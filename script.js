// --- DATE AS TITLE + TAB TITLE ---
const title = document.getElementById("page-title");
const tabTitle = document.getElementById("tab-title");

const today = new Date();
const day = today.toLocaleString('en-US', { day: 'numeric' });
const month = today.toLocaleString('en-US', { month: 'long' });

const formatted = `${day} ${month}`;
title.textContent = formatted;
tabTitle.textContent = formatted;

// --- BIBLE VERSE ---
fetch("https://labs.bible.org/api/?passage=random&type=json")
  .then(res => res.json())
  .then(data => {
    const verse = data[0];
    document.getElementById("bible-verse").textContent =
      `"${verse.text}" — ${verse.bookname} ${verse.chapter}:${verse.verse}`;
  });

// --- DAILY QUOTE (ZenQuotes, reliable HTTPS) ---
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
