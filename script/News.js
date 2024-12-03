const apiKey = "1b028ec6f11949a48e9368069ce00f76";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news:", error);
    return [];
  }
}

async function fetchNewsByQuery(query) {
  try {
    const pageSize = 20;
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const articlesWithImage = data.articles.filter(
      (article) => article.urlToImage
    );
    return articlesWithImage;
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = ""; 
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDes =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    description.textContent = truncatedDes;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsByQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching news by query:", error);
    }
  }
});

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news:", error);
  }
})();
