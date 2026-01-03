const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newBtn = document.getElementById("newBtn");
const copyBtn = document.getElementById("copyBtn");

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
];

let lastIndex = -1;

function getRandomQuote() {
  let index = Math.floor(Math.random() * QUOTES.length); // values between 0 and the quotes.length - 1

  // if it's the same as last quote, pick a different one
  if (index === lastIndex) {
    index = Math.floor(Math.random() * QUOTES.length);
  }
  lastIndex = index;
  return QUOTES[index];
}

function displayQuote() {
  const quote = getRandomQuote();
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = "- " + quote.author;
}

function copyQuote() {
  const text = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text);

  copyBtn.textContent = "Copied!";

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
}

newBtn.addEventListener("click", displayQuote);
copyBtn.addEventListener("click", copyQuote);

// show the first quote
displayQuote();
