const quotes = [
  "Success is not final, failure is not fatal:\nIt is the courage to continue that counts.",
  "Opportunities don't happen.\nYou create them through hard work and persistence.",
  "Sometimes later becomes never.\nDo it now and give it your full commitment and effort.",
  "You have within you right now\neverything you need to deal with whatever the world throws at you.",
  "Hardships often prepare ordinary people\nfor an extraordinary destiny.\nKeep pushing forward."
];

let quoteText = "";
let startTime = null;
let isTyping = false;

const quoteDisplay = document.getElementById("quote");
const inputBox = document.getElementById("input-box");
const result = document.getElementById("result");
const startBtn = document.getElementById("start-btn");

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText = quotes[randomIndex];
  quoteDisplay.innerText = quoteText;
}

function startTest() {
  generateQuote();
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();
  result.innerHTML = "";
  isTyping = true;
  startTime = new Date().getTime();
}

function endTest() {
  const endTime = new Date().getTime();
  const timeTakenInSec = (endTime - startTime) / 1000;

  const typedText = inputBox.value.trim();
  const quoteWords = quoteText.trim().split(/\s+/);
  const typedWords = typedText.split(/\s+/);

  const wpm = Math.round((typedWords.length / timeTakenInSec) * 60);

  let correctChars = 0;
  for (let i = 0; i < Math.min(typedText.length, quoteText.length); i++) {
    if (typedText[i] === quoteText[i]) correctChars++;
  }

  const accuracy = ((correctChars / quoteText.length) * 100).toFixed(2);

  result.innerHTML = `
    <p><strong>Time:</strong> ${timeTakenInSec.toFixed(2)} seconds</p>
    <p><strong>WPM:</strong> ${wpm}</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;

  isTyping = false;
  inputBox.disabled = true;
}

inputBox.addEventListener("input", () => {
  if (!isTyping) return;

  if (inputBox.value.length >= quoteText.length) {
    endTest();
  }
});

startBtn.addEventListener("click", startTest);

// Prevent copy-paste
inputBox.addEventListener("paste", (e) => e.preventDefault());
inputBox.addEventListener("copy", (e) => e.preventDefault());

