fetch("https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en")
  .then(res => res.json())
  .then(data => {

    // MAIN NEWS
    const main = data.items[0];
    document.getElementById("main-news").innerHTML = `
      <img src="${main.thumbnail || 'https://via.placeholder.com/400'}">
      <div class="title">${main.title}</div>
    `;

    // OTHER NEWS
    const list = document.getElementById("news-list");
    list.innerHTML = "";

    data.items.slice(1, 7).forEach(item => {
      list.innerHTML += `
        <div class="news-item">
          <img src="${item.thumbnail || 'https://via.placeholder.com/90'}">
          <a href="${item.link}" target="_blank">${item.title}</a>
        </div>
      `;
    });

  })
  .catch(() => {
    document.getElementById("main-news").innerText = "Failed to load news";
  });
