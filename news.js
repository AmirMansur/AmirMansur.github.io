fetch("https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss")
  .then(res => res.json())
  .then(data => {
    const newsBox = document.getElementById("news");
    newsBox.innerHTML = "";

    data.items.slice(0, 6).forEach(item => {
      const div = document.createElement("div");
      div.className = "news-card";

      div.innerHTML = `
        <img src="${item.thumbnail || 'https://via.placeholder.com/90'}">
        <a href="${item.link}" target="_blank">${item.title}</a>
      `;

      newsBox.appendChild(div);
    });
  })
  .catch(() => {
    document.getElementById("news").innerHTML = "Failed to load news";
  });
