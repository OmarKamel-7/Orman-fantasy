// Login
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    const response = await fetch("data.json");
    const data = await response.json();

    let found = data.users.find(u => u.username === user && u.password === pass);

    if (found) {
        localStorage.setItem("currentUser", user);
        window.location = "team.html";
    } else {
        document.getElementById("error").innerText = "Wrong username or password!";
    }
}

// In team page
if (location.pathname.endsWith("team.html")) {
    document.getElementById("user").innerText = localStorage.getItem("currentUser");
    loadPlayers();
    loadMatches();
}

async function loadPlayers() {
    const response = await fetch("data.json");
    const data = await response.json();

    let div = document.getElementById("players");
    let selectedPlayers = [];

    data.players.forEach(p => {
        let btn = document.createElement("button");
        btn.innerText = `${p.name} (Goals: ${p.goals})`;
        btn.classList.add("player");

        btn.onclick = () => {
            if (selectedPlayers.length < 3 && !selectedPlayers.includes(p.name)) {
                selectedPlayers.push(p.name);
                btn.style.background = "green";
            }
            if (selectedPlayers.length === 3) {
                document.getElementById("message").innerText =
                    "✅ You picked 3 players: " + selectedPlayers.join(", ");
            }
        };

        div.appendChild(btn);
    });
}

async function loadMatches() {
    const response = await fetch("data.json");
    const data = await response.json();

    let ul = document.getElementById("matches");

    data.matches.forEach(m => {
        let li = document.createElement("li");
        li.innerText = `${m.match} → ${m.score}`;
        ul.appendChild(li);
    });
}
