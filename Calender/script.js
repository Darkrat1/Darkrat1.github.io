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
//     DAILY MOTIVATIONAL QUOTE (once per day)
// ==========================

// Predefined motivational quotes
const motivationalQuotes = [
  "The best way to get started is to quit talking and begin doing. — Walt Disney",
  "Don't let yesterday take up too much of today. — Will Rogers",
  "It's not whether you get knocked down, it's whether you get up. — Vince Lombardi",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Great things never come from comfort zones.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes later becomes never. Do it now.",
  "Little things make big days.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Wish it. Do it.",
  "Success is not for the lazy.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The harder the struggle, the more glorious the triumph.",
  "Opportunities don’t happen. You create them. — Chris Grosser",
  "Don’t wait for the perfect moment. Take the moment and make it perfect.",
  "You are capable of amazing things.",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Push yourself because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Do something today that your future self will thank you for.",
  "Little by little, a little becomes a lot.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The key to success is to focus on goals, not obstacles.",
  "Success doesn’t come to you, you go to it.",
  "Your limitation—it’s only your imagination.",
  "Sometimes later becomes never. Do it now.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Dream bigger. Do bigger.",
  "Do something today that your future self will thank you for.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Don’t wait for opportunity. Create it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Believe in yourself and all that you are.",
  "The harder the struggle, the more glorious the triumph.",
  "Opportunities don’t happen. You create them. — Chris Grosser",
  "You are capable of amazing things.",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Don’t stop until you’re proud.",
  "Work hard in silence. Let success make the noise.",
  "The secret of getting ahead is getting started.",
  "Don’t count the days, make the days count. — Muhammad Ali",
  "You don’t have to be great to start, but you have to start to be great.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Little things make big days.",
  "Dream it. Wish it. Do it.",
  "Success is not for the lazy.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The harder the struggle, the more glorious the triumph.",
  "Opportunities don’t happen. You create them. — Chris Grosser",
  "Don’t wait for the perfect moment. Take the moment and make it perfect.",
  "You are capable of amazing things.",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Push yourself because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Do something today that your future self will thank you for.",
  "Little by little, a little becomes a lot.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The key to success is to focus on goals, not obstacles.",
  "Success doesn’t come to you, you go to it.",
  "Your limitation—it’s only your imagination.",
  "Sometimes later becomes never. Do it now.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Dream bigger. Do bigger.",
  "Do something today that your future self will thank you for.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Don’t wait for opportunity. Create it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Believe in yourself and all that you are.",
  "The harder the struggle, the more glorious the triumph.",
  "Opportunities don’t happen. You create them. — Chris Grosser",
  "You are capable of amazing things.",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Don’t stop until you’re proud.",
  "Work hard in silence. Let success make the noise.",
  "The secret of getting ahead is getting started.",
  "Don’t count the days, make the days count. — Muhammad Ali",
  "You don’t have to be great to start, but you have to start to be great.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Little things make big days.",
  "Dream it. Wish it. Do it.",
  "Success is not for the lazy.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The harder the struggle, the more glorious the triumph.",
  "Believe in yourself even when no one else does.",
  "Your only limit is your mind.",
  "Small steps every day lead to big results.",
  "Consistency is what transforms average into excellence.",
  "Failure is simply the opportunity to begin again, smarter.",
  "Your dreams don’t work unless you do.",
  "Discipline is the bridge between goals and achievement.",
  "Don’t wait for opportunity. Create it.",
  "The secret to getting ahead is getting started.",
  "Act as if what you do makes a difference. It does.",
  "Push yourself because no one else will.",
  "Dreams don’t work unless you take action.",
  "Success is the sum of small efforts repeated daily.",
  "Every day is a new beginning.",
  "Your mindset determines your success.",
  "Start where you are. Use what you have. Do what you can.",
  "Doubt kills more dreams than failure ever will.",
  "Turn your setbacks into comebacks.",
  "The best investment you can make is in yourself.",
  "Focus on progress, not perfection.",
  "Your passion is your power.",
  "Courage is the key to success.",
  "Every accomplishment starts with the decision to try.",
  "Do what is right, not what is easy.",
  "The only way to achieve your goals is to take action.",
  "Small progress is still progress.",
  "Success is built on perseverance.",
  "Your future is created by what you do today.",
  "Stop wishing. Start doing.",
  "Be stronger than your excuses.",
  "Greatness begins with the decision to try.",
  "The only limit to your impact is your imagination.",
  "Push past your comfort zone and grow.",
  "Don’t let fear hold you back.",
  "You are stronger than you think.",
  "Do one thing every day that scares you.",
  "Turn your dreams into plans and your plans into action.",
  "Success is earned, not given.",
  "Believe, act, achieve.",
  "Your journey is your own; embrace it.",
  "Small habits lead to big results.",
  "Keep going. The best is yet to come.",
  "Every expert was once a beginner.",
  "Don’t stop until you’re proud of yourself.",
  "Your attitude determines your altitude.",
  "Strive for progress, not perfection.",
  "Motivation gets you started. Habit keeps you going.",
  "Success requires patience and persistence.",
  "Don’t fear failure; fear being in the same place next year.",
  "Your hard work will pay off.",
  "Focus on what you can control.",
  "The difference between ordinary and extraordinary is effort.",
  "Act with intention and purpose.",
  "One day or day one — you decide.",
  "Your energy introduces you before you speak.",
  "Do it with passion or not at all.",
  "Every morning is a fresh start.",
  "Your effort today determines your success tomorrow.",
  "Success is built one step at a time.",
  "Don’t wait for permission to pursue your dreams.",
  "You are capable of more than you imagine.",
  "The pain you feel today will be your strength tomorrow.",
  "Commit to the process, trust the journey.",
  "Focus on your goals, not the obstacles.",
  "Work until your idols become rivals.",
  "Take action now, not later.",
  "Your dreams are worth the effort.",
  "Embrace challenges; they make you stronger.",
  "The harder you work, the luckier you get.",
  "Don’t be afraid to fail. Be afraid not to try.",
  "Success is a series of small wins.",
  "Dream it. Plan it. Do it.",
  "You are the author of your own story.",
  "Opportunities are created by action.",
  "Your potential is limitless.",
  "Work for it, don’t wait for it.",
  "The journey of a thousand miles begins with one step. — Lao Tzu",
  "Consistency is key to mastery.",
  "Focus on being productive, not busy.",
  "Don’t let anyone define your limits.",
  "Your mindset shapes your reality.",
  "Act boldly and unseen forces will come to your aid.",
  "Success requires sacrifice.",
  "Be relentless in the pursuit of your goals.",
  "Take risks. Fail. Learn. Repeat.",
  "Your habits shape your future.",
  "Push forward, even when it’s tough.",
  "Don’t stop. Your goals are closer than you think.",
  "Strive for progress every single day.",
  "Believe in the power of yet.",
  "Success is the sum of small efforts repeated daily.",
  "Your passion is the fuel for your journey.",
  "Do what you love, love what you do.",
  "Your comfort zone is your enemy.",
  "You are capable of achieving greatness.",
  "Don’t quit. Great things take time.",
  "Turn challenges into opportunities.",
  "Your attitude determines your success.",
  "The only time success comes before work is in the dictionary.",
  "Be patient. Be persistent. Be unstoppable.",
  "The future depends on what you do today.",
  "Stay consistent. Your time will come.",
  "Do it because you can, not because you have to.",
  "Every day is a chance to improve yourself.",
  "Success favors the prepared mind.",
  "Your focus determines your reality.",
  "Keep moving forward, no matter what.",
  "Act today. Your future self will thank you.",
  "Work hard, stay humble, dream big."
];

// Pick a quote index based on the day of the year
const dayOfYear = Math.floor(
  (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
);
const quoteIndex = dayOfYear % motivationalQuotes.length;
document.getElementById("quote").textContent = motivationalQuotes[quoteIndex];


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
