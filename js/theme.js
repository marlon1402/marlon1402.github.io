function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const themeSwitch = document.getElementById('themeSwitch');
    const themeIcon = document.getElementById('themeIcon');

    if (themeSwitch) {
        themeSwitch.setAttribute('aria-checked', theme === 'light');
    }

    if (themeIcon) {
        themeIcon.innerHTML = theme === 'light'
            ? `<circle cx="12" cy="12" r="5"></circle>
               <line x1="12" y1="1" x2="12" y2="3"></line>
               <line x1="12" y1="21" x2="12" y2="23"></line>
               <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
               <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
               <line x1="1" y1="12" x2="3" y2="12"></line>
               <line x1="21" y1="12" x2="23" y2="12"></line>
               <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
               <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`
            : `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />`;
    }
}

function toggleTheme() {
    const current = localStorage.getItem('theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
}

function bindTheme() {
    const themeSwitch = document.getElementById('themeSwitch');

    if (!themeSwitch) return;

    themeSwitch.addEventListener('click', toggleTheme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    bindTheme();
}

/* 🔥 quando header carregar */
window.addEventListener('componentsLoaded', () => {
    initTheme();
});

/* 🔥 fallback */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

/* 🔥 botão voltar (bfcache) */
window.addEventListener('pageshow', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
});