async function loadComponent(selector, path) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(path);
    const html = await res.text();

    el.innerHTML = html;
}

async function waitForTranslations() {
    while (!window.translations || Object.keys(window.translations).length === 0) {
        await new Promise(r => setTimeout(r, 50));
    }
}

async function loadComponents() {
    await loadComponent('#header', '/components/header.html');

    // 🔥 espera o JSON carregar
    await waitForTranslations();

    const lang = localStorage.getItem('lang') || 'PT';

    if (window.applyLang) window.applyLang(lang);
    if (window.bindDropdownEvents) window.bindDropdownEvents();
    if (window.bindThemeEvents) window.bindThemeEvents();   
}

loadComponents();