const mainBox = document.getElementById("main-news");
const listBox = document.getElementById("news-list");

mainBox.innerHTML = "<p>Loading top news...</p>";

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en")
  .then(res => res.json())
  .then(data => {

    // MAIN NEWS
    const main = data.items[0];
    mainBox.innerHTML = `
      <img src="${main.thumbnail || 'https://via.placeholder.com/400'}">
      <div class="title">${main.title}</div>
    `;

    // OTHER NEWS
    listBox.innerHTML = "";
    data.items.slice(1, 7).forEach(item => {
      listBox.innerHTML += `
        <div class="news-item">
          <img src="${item.thumbnail || 'https://via.placeholder.com/90'}">
          <a href="${item.link}" target="_blank">${item.title}</a>
        </div>
      `;
    });

  })
  .catch(() => {
    mainBox.innerHTML = "<p>⚠️ News loading failed. Refresh page.</p>";
  });
