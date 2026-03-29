async function loadComponent(selector, path) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(path);
    const html = await res.text();

    el.innerHTML = html;
}

async function loadComponents() {
    await loadComponent('#header', '/components/header.html');

    // 🔥 inicializa TUDO depois que o header existe
    initAfterComponents();
}

function initAfterComponents() {
    // 🔥 idioma
    if (window.applyLang && window.translations) {
        const lang = localStorage.getItem('lang') || 'PT';
        window.applyLang(lang);
    }

    if (window.initLanguage) {
        window.initLanguage();
    }

    // 🔥 tema
    if (window.initTheme) {
        window.initTheme();
    }

    // 🔥 menu mobile
    initMobileMenu();
}

/* ========================= */
/* 📱 MENU MOBILE */
/* ========================= */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('headerControls');

    if (!toggle || !menu) return;

    // evitar duplicação de eventos
    toggle.replaceWith(toggle.cloneNode(true));
    const newToggle = document.getElementById('menuToggle');

    newToggle.addEventListener('click', (e) => {
        e.stopPropagation();

        menu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !newToggle.contains(e.target)) {
            menu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });

    // fechar ao clicar em link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
}

/* ========================= */
/* 🚀 START */
/* ========================= */
loadComponents();