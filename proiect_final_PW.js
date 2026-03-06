// --- SELECTARE ELEMENTE DOM ---
const loginView = document.getElementById('login-view');
const registerView = document.getElementById('register-view');
const linkLogin = document.getElementById('link-login');
const linkRegister = document.getElementById('link-register');

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const authContainer = document.getElementById('auth-container');
const dashboardView = document.getElementById('dashboard-view');

// --- LOGICA SCHIMBARE PAGINI (Login <-> Register) ---
linkLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerView.classList.add('hidden');
    loginView.classList.remove('hidden');
});

linkRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginView.classList.add('hidden');
    registerView.classList.remove('hidden');
});

// --- HELPER LOCAL STORAGE (Preluare date) ---
function getUsers() {
    const storedUsers = localStorage.getItem('appUsers');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// --- LOGICA INREGISTRARE (REGISTER) ---
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // .trim() ca să nu salvăm spații goale accidentale
    const user = document.getElementById('reg-user').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
    
    const users = getUsers();

    // Verificăm dacă numele de utilizator există deja (fără să conteze literele mari/mici)
    const userExists = users.find(u => u.username.toLowerCase() === user.toLowerCase());

    if (userExists) {
        alert("Acest nume de utilizator este deja folosit!");
        return;
    }

    // Salvăm utilizatorul nou
    users.push({ username: user, password: pass });
    localStorage.setItem('appUsers', JSON.stringify(users));

    alert("Cont creat cu succes! Acum te poți loga.");
    
    registerForm.reset();
    linkLogin.click(); // Ne trimite automat la ecranul de Login
});

// --- LOGICA AUTENTIFICARE (LOGIN) ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Luăm datele și curățăm spațiile
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    const users = getUsers();

    // Căutăm utilizatorul (username-ul nu e "case-sensitive", parola DA)
    const validUser = users.find(u => 
        u.username.toLowerCase() === user.toLowerCase() && u.password === pass
    );

    if (validUser) {
        alert("Login reușit! Bine ai venit, " + validUser.username);
        
        // Ascundem zona de login și afișăm site-ul
        authContainer.classList.add('hidden');
        dashboardView.classList.remove('hidden');
    } else {
        alert("Utilizator sau parolă incorectă!");
    }
});

// --- LOGICA DECONECTARE (LOGOUT) ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        dashboardView.classList.add('hidden');
        authContainer.classList.remove('hidden');
        loginView.classList.remove('hidden');
        registerView.classList.add('hidden');

        loginForm.reset();
        alert("Te-ai deconectat cu succes.");
    });
}

// --- LOGICA ARATĂ/ASCUNDE PAROLA ---
const passInput = document.getElementById('login-pass');
const toggleBtn = document.getElementById('toggle-pass');

if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
        if (passInput.type === "password") {
            passInput.type = "text";
            toggleBtn.textContent = "Hide";
        } else {
            passInput.type = "password";
            toggleBtn.textContent = "Show";
        }
    });
}
// --- LOGICA FORMULAR CONTACT ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Împiedică reîncărcarea paginii

        // Preluăm valorile (opțional, pentru a le folosi în alertă)
        const nume = contactForm.querySelector('input[type="text"]').value;

        // Simulăm trimiterea
        alert("Mulțumim, " + nume + "! Mesajul tău a fost trimis cu succes. Te vom contacta în curând.");

        // Resetăm (golim) formularul
        contactForm.reset();
    });
}