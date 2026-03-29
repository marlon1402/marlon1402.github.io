const langWrapper = document.getElementById('langWrapper');
const langDropdown = document.getElementById('langDropdown');
const activeLangFlag = document.getElementById('activeLangFlag');
const activeLangCode = document.getElementById('activeLangCode');

let translations = {};

// 🔹 CARREGAR JSON
async function loadTranslations() {
    try {
        const response = await fetch('/assets/data/translation.json');
        translations = await response.json();

        // 🔥 CORREÇÃO CRÍTICA
        window.translations = translations;

        initLanguage();
    } catch (error) {
        console.error('Erro ao carregar traduções:', error);
    }
}

function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;

    // 🔥 busca elementos SEMPRE atualizado
    const activeLangFlag = document.getElementById('activeLangFlag');
    const activeLangCode = document.getElementById('activeLangCode');

    if (activeLangFlag && activeLangCode) {
        activeLangFlag.textContent = t.flag;
        activeLangCode.textContent = lang;
    }

    document.documentElement.setAttribute('lang', t.locale);
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = t.texts[key];

        if (value !== undefined) {
            el.innerHTML = value.replace(/\n/g, '<br>');
        }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attrConfig = el.dataset.i18nAttr.split(',');

        attrConfig.forEach(pair => {
            const [attr, key] = pair.split(':').map(s => s.trim());
            const value = t.texts[key];

            if (value !== undefined) {
                el.setAttribute(attr, value);
            }
        });
    });
    window.dispatchEvent(new Event("languageChanged"));
}

function bindDropdownEvents() {
    const langWrapper = document.getElementById('langWrapper');
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (!langBtn || !langWrapper || !langDropdown) return;

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = langWrapper.classList.toggle('open');
        langBtn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', () => {
        langWrapper.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
    });

    langDropdown.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();

            langDropdown.querySelectorAll('.lang-option')
                .forEach(o => o.classList.remove('active'));

            opt.classList.add('active');
            langWrapper.classList.remove('open');
            langBtn.setAttribute('aria-expanded', 'false');

            applyLang(opt.dataset.lang);
        });
    });
}

function initLanguage() {
    const langDropdown = document.getElementById('langDropdown');
    if (!langDropdown) return;

    const savedLang = localStorage.getItem('lang') || 'PT';

    const selected = langDropdown.querySelector(`[data-lang="${savedLang}"]`);

    if (selected) {
        langDropdown.querySelector('.lang-option.active')?.classList.remove('active');
        selected.classList.add('active');
    }

    applyLang(savedLang);
    bindDropdownEvents();
}

// 🔥 🔥 FIX DO BOTÃO VOLTAR (bfcache)
window.addEventListener('pageshow', (event) => {
    const lang = localStorage.getItem('lang') || 'PT';

    // reaplica sempre (seguro e simples)
    if (translations && Object.keys(translations).length > 0) {
        applyLang(lang);
    }
});
// 🔹 START
loadTranslations();

// 🔹 EXPOR GLOBAL (para components.js)
window.applyLang = applyLang;
window.initLanguage = initLanguage;
window.bindDropdownEvents = bindDropdownEvents;
window.translations = translations;