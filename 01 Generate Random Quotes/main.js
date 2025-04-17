// ......
const heading = document.querySelector(".heading");
const generateButton = document.querySelector(".generate-btn");
const autoButton = document.querySelector(".auto-btn");
const autoText = document.querySelector(".auto-text");
const stopButton = document.querySelector(".stop-btn");
const showButton = document.querySelector(".show-btn");
const numberContainer = document.querySelector(".number span");
const quoteContainer = document.querySelector(".quote-content");
const overlayContainer = document.querySelector(".overlay");
const bookmarksContainer = document.querySelector(".bookmarks");
const exitButton = document.querySelector(".exit");
const bookmarks = [];
let intervalId;
let auto = false;

// .....
// Clear Local Storage When The Page Loaded
localStorage.removeItem("quotes");

const getQuote = async function () {
  try {
    const response = await fetch("quotes.json ");
    if (!response.ok) throw new Error("⚠️⚠️ Something Went Wrong");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Generating Quote ....
const generateQuote = async function () {
  const { quotes } = await getQuote();
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomNumber];
  const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  const html = ` 

  <p class="quote-text">
    <i class="fa-solid fa-quote-left"></i>
    ${quote.quote}
    <i class="fa-solid fa-quote-right"></i>
    <i class="fa-solid fa-bookmark bookmark-icon"></i>
    </p>
    <span class="author">${quote.author}</span>

    `;
  heading.classList.add("hidden");
  quoteContainer.innerHTML = "";
  quoteContainer.insertAdjacentHTML("afterbegin", html);
  numberContainer.innerHTML = +numberContainer.innerHTML + 1;
  storedQuotes.push(quote);
  localStorage.setItem("quotes", JSON.stringify(storedQuotes));
};

// Auto Generating Quote ....

const autoGenerateQuote = function () {
  generateQuote();
  auto = true;
  autoText.classList.remove("hidden");
  intervalId = setInterval(generateQuote, 4000);
};
// Stop Auto Generating Quote ....

const stopAutoGenerateQuote = function () {
  clearInterval(intervalId);
  autoText.classList.add("hidden");
  auto = false;
};
// Show Bookmarked Quotes
const showQuotes = function () {
  const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  overlayContainer.classList.remove("hidden");
  bookmarksContainer.classList.remove("hidden");
  if (bookmarks.length === 0) {
    bookmarksContainer.insertAdjacentHTML(
      "beforeend",
      `<p class="bookmarks-message">No Quotes Are Bookmarked Yet 😔😔</p>`
    );
  } else {
    bookmarks.forEach((bookmark, index) => {
      const html = `
      <div class="quote-content">
      <p class="quote-text">
       ${index + 1}. <i class="fa-solid fa-quote-left"></i>
        ${bookmark.quote}
        <i class="fa-solid fa-quote-right"></i>
        </p>
        <span class="author">${bookmark.author}</span>
        </div>
        `;

      bookmarksContainer.insertAdjacentHTML("beforeend", html);
    });
  }
};
const addBookmark = function () {
  const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  storedQuotes[storedQuotes.length - 1].bookmarked = true;
  bookmarks.push(storedQuotes[storedQuotes.length - 1]);
  localStorage.setItem("quotes", JSON.stringify(storedQuotes));
};
const delBookmark = function () {
  const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  storedQuotes[storedQuotes.length - 1].bookmarked = false;
  bookmarks.pop();
  localStorage.setItem("quotes", JSON.stringify(storedQuotes));
};
generateButton.addEventListener("click", () => {
  if (!auto) generateQuote();
});
autoButton.addEventListener("click", () => {
  if (!auto) autoGenerateQuote();
});
stopButton.addEventListener("click", stopAutoGenerateQuote);
showButton.addEventListener("click", showQuotes);
// Exit Bookmarks Box
bookmarksContainer.addEventListener("click", (e) => {
  if (e.target.closest(".exit")) {
    overlayContainer.classList.add("hidden");
    bookmarksContainer.classList.add("hidden");
    bookmarksContainer.innerHTML = `<div class="exit">X</div>`;
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    overlayContainer.classList.add("hidden");
    bookmarksContainer.classList.add("hidden");
    bookmarksContainer.innerHTML = `<div class="exit">X</div>`;
  }
});
quoteContainer.addEventListener("click", async function (e) {
  if (e.target.closest(".bookmark-icon")) {
    e.target.classList.toggle("blue-color");
  }
  if (e.target.classList.contains("blue-color")) {
    addBookmark();
  } else delBookmark();
});
