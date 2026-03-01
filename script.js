// 🔒 XSS se bachne ke liye sanitize function
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// 🚀 Page load hote hi naam check karega
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name && name.trim() !== '') {
        const safeName = escapeHTML(name);

        // Greeting text show karega
        document.getElementById('greeting').innerHTML =
            "✨ " + safeName + " ✨ <br> ki taraf se aapko Happy Holi!";

        document.title = safeName + " ne aapko Holi wish bheja hai!";
    }
};

// 🔗 Link generate karne ka function
function generateLink() {
    const inputName = document.getElementById('nameInput').value.trim();

    if (inputName === '') {
        alert("Kripya apna naam darj karein!");
        return;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = baseUrl + "?name=" + encodeURIComponent(inputName);

    document.getElementById('generated-link-text').innerText = newUrl;
    document.getElementById('share-section').style.display = 'block';

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// 📱 WhatsApp Share
function shareOnWhatsApp() {
    const link = document.getElementById('generated-link-text').innerText;

    const message =
        "*Ek baar is link par click karke dekho mere message mein kya hai!* 🎨\n\n👉 " + link;

    const whatsappUrl =
        "https://api.whatsapp.com/send?text=" + encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
}

// 📲 Telegram Share
function shareOnTelegram() {
    const link = document.getElementById('generated-link-text').innerText;

    const message =
        "Ek baar is link par click karke dekho 🎨 👉 " + link;

    const telegramUrl =
        "https://t.me/share/url?url=" +
        encodeURIComponent(link) +
        "&text=" +
        encodeURIComponent(message);

    window.open(telegramUrl, "_blank");
}

// 📋 Copy Link
function copyLink() {
    const link = document.getElementById('generated-link-text').innerText;

    navigator.clipboard.writeText(link).then(() => {
        alert("Link copy ho gaya hai!");
    }).catch(() => {
        alert("Copy karne mein problem hui!");
    });
}