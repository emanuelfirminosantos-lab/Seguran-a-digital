const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>/?",
    ambiguous: "0O1lI"
};

function updateLength(slider) {
    document.getElementById("lengthValue").textContent = slider.value;
}

function getStrength(password) {
    let score = password.length * 2;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    if (score >= 95) return { text: "IMBATÍVEL 🟢", color: "#22c55e", width: "100%" };
    if (score >= 75) return { text: "MUITO FORTE 🟡", color: "#eab308", width: "85%" };
    if (score >= 55) return { text: "FORTE 🟠", color: "#f97316", width: "65%" };
    return { text: "FRACA 🔴", color: "#ef4444", width: "40%" };
}

function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    const upper = document.getElementById("uppercase").checked;
    const lower = document.getElementById("lowercase").checked;
    const num = document.getElementById("numbers").checked;
    const sym = document.getElementById("symbols").checked;
    const avoidAmb = document.getElementById("avoidAmbiguous").checked;

    let pool = "";
    if (upper) pool += chars.uppercase;
    if (lower) pool += chars.lowercase;
    if (num) pool += chars.numbers;
    if (sym) pool += chars.symbols;

    if (pool === "") {
        alert("Selecione pelo menos um tipo de caractere!");
        return;
    }

    let password = "";
    if (upper) password += chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)];
    if (lower) password += chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)];
    if (num) password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];
    if (sym) password += chars.symbols[Math.floor(Math.random() * chars.symbols.length)];

    while (password.length < length) {
        const char = pool[Math.floor(Math.random() * pool.length)];
        if (avoidAmb && chars.ambiguous.includes(char)) continue;
        password += char;
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('').substring(0, length);

    const display = document.getElementById("password");
    display.textContent = password;

    const strength = getStrength(password);
    const bar = document.getElementById("strengthBar");
    bar.style.width = strength.width;
    bar.style.backgroundColor = strength.color;
    document.getElementById("strengthText").textContent = strength.text;

    // Animação
    display.style.animation = 'none';
    setTimeout(() => display.style.animation = 'goal 0.6s', 10);
}

function copyPassword() {
    const password = document.getElementById("password").textContent;
    if (password.length < 6) {
        alert("Gere uma senha primeiro!");
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        const btn = document.querySelector('.copy-btn');
        const original = btn.textContent;
        btn.textContent = "✅ COPIADO!";
        setTimeout(() => btn.textContent = original, 1800);
    });
}

// Gerar senha ao carregar
window.onload = () => setTimeout(generatePassword, 500);
