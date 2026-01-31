const allowedUsers = {
  "amir": "1234",
  "admin": "0000"
};

function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;
  let msg = document.getElementById("msg");

  if (allowedUsers[u] === p) {
    localStorage.setItem("loggedIn", "yes");
    location.href = "secret.html";
  } else {
    msg.innerText = "Wrong username or password";
  }
}

function protect() {
  if (localStorage.getItem("loggedIn") !== "yes") {
    location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.href = "index.html";
}
