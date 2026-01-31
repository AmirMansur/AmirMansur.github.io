// ===== ALLOWED USERS =====
const allowedUsers = {
  "admin": "0000",
  "user1": "1234",
  "1": "1"
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

    // ONLY secret.html
    window.location.href = "./secret.html";
  } else {
    msg.innerText = "Wrong username or password";
  }
}

// ===== PROTECT SECRET PAGE =====
function protect() {
  if (sessionStorage.getItem("loggedIn") !== "yes") {
    window.location.href = "login.html";
    return;
  }

  // Block back button
  history.pushState(null, null, location.href);
  window.onpopstate = () => history.pushState(null, null, location.href);

  startSessionTimer();

  // Delay inactivity detection
  setTimeout(startInactivityTracking, 1000);
}

// ===== SESSION TIMER (30s) =====
function startSessionTimer() {
  const timerBox = document.getElementById("timer");

  sessionTimer = setInterval(() => {
    const loginTime = Number(sessionStorage.getItem("loginTime"));
    const remaining = SESSION_LIMIT - (Date.now() - loginTime);

    if (remaining <= 0) {
      alert("Session expired.");
      logout();
    } else if (timerBox) {
      timerBox.innerText =
        "Session expires in: " + Math.ceil(remaining / 1000) + " seconds";
    }
  }, 1000);
}

// ===== INACTIVITY (5s) =====
function startInactivityTracking() {
  resetInactivityTimer();

  ["mousemove", "keydown", "scroll", "touchstart"].forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
  });
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert("Logged out due to inactivity.");
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
