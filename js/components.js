async function loadComponent(selector, path) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(path);
    const html = await res.text();

    el.innerHTML = html;
}

async function loadComponents() {
    await loadComponent('#header', '/components/header.html');

    // 🔥 Reaplica traduções depois que o DOM mudou
    if (window.applyLang && window.translations) {
        const lang = localStorage.getItem('lang') || 'PT';
        window.applyLang(lang);
    }

    // 🔥 Rebind dos eventos (dropdown)
    if (window.initLanguage) {
        window.initLanguage();
    }
}

loadComponents();