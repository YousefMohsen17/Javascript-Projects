const APIKey = "db135aa8267a4fde891ea99065d4a855";
const APIUrl = async function () {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKey}`
    );
    if (!res.ok) throw new Error("Check Your Url");
    const data = await res.json();
    const articles = data.articles;

    return articles;
  } catch (err) {
    console.error(err);
  }
};
const news = async function () {
  const articles = await APIUrl();
  const newsContainer = document.querySelector(".news");
  articles.forEach((article) => {
    const date = article.publishedAt.split("T")[0];
    const html = `<div class="box">
        <h2 class="title">
        ${article.title}
        </h2>
        <div>
        <span class="author"> 
        ${article.author}
        </span>
        <span class="date">
        ${date}
        </span>
        </div>
        <img
        src=${article.urlToImage || "No Image"}
        alt=""
        />
        <p class="content">
        ${article.description || "No Description"}    
        </p>
        </div>
    `;
    newsContainer.insertAdjacentHTML("beforeend", html);
  });
};
window.addEventListener("load", news);
