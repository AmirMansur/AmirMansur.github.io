fetch("https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("news");
    list.innerHTML = "";

    data.items.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
      list.appendChild(li);
    });
  })
  .catch(() => {
    document.getElementById("news").innerHTML =
      "<li>Unable to load news</li>";
  });
