// ===== ALLOWED USERS =====
const allowedUsers = {
  "admin": "0000",
  "user1": "1234",
  "1": "1"          // NEW ACCOUNT
};

let inactivityTimer;
let sessionTimer;

const SESSION_LIMIT = 30000;   // 30 seconds
const INACTIVITY_LIMIT = 5000; // 5 seconds

// ===== LOGIN =====
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  const msg = document.getElementById("msg");

  if (allowedUsers[u] === p) {
    sessionStorage.setItem("loggedIn", "yes");
    sessionStorage.setItem("loginTime", Date.now());

    window.location.href = "secret.html";
  } else {
    msg.innerText = "Wrong username or password";
  }
}

// ===== PROTECT SECRET PAGE =====
function protect() {
  if (sessionStorage.getItem("loggedIn") !== "yes") {
    logout();
    return;
  }

  // Disable back button
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.pushState(null, null, location.href);
  };

  startSessionTimer();
  resetInactivityTimer();

  // Detect user interaction
  ["mousemove", "keydown", "scroll", "touchstart"].forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
  });
}

// ===== SESSION TIMER (30 seconds) =====
function startSessionTimer() {
  const timerBox = document.getElementById("timer");

  sessionTimer = setInterval(() => {
    const loginTime = sessionStorage.getItem("loginTime");
    const now = Date.now();
    const remaining = SESSION_LIMIT - (now - loginTime);

    if (remaining <= 0) {
      alert("Session expired (30 seconds).");
      logout();
    } else if (timerBox) {
      timerBox.innerText =
        "Session expires in: " + Math.ceil(remaining / 1000) + " seconds";
    }
  }, 1000);
}

// ===== INACTIVITY TIMER (5 seconds) =====
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert("Logged out due to inactivity (5 seconds).");
    logout();
  }, INACTIVITY_LIMIT);
}

// ===== LOGOUT =====
function logout() {
  sessionStorage.clear();
  clearTimeout(inactivityTimer);
  clearInterval(sessionTimer);
  window.location.href = "login.html";
}
