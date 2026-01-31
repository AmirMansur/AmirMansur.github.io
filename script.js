// Allowed users (demo)
const allowedUsers = {
  "user1": "1234",
  "admin": "0000"
};

// LOGIN FUNCTION
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  const msg = document.getElementById("msg");

  if (allowedUsers[u] === p) {
    // ONE-TIME SESSION (not permanent)
    sessionStorage.setItem("loggedIn", "yes");

    // Go to protected area
    window.location.href = "dashboard.html";
  } else {
    msg.innerText = "Wrong username or password";
  }
}

// PROTECT FUNCTION (for secret/dashboard page)
function protect() {
  if (sessionStorage.getItem("loggedIn") !== "yes") {
    window.location.href = "login.html";
  }
}

// LOGOUT FUNCTION
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}
