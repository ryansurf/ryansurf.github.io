const schemes = [
    // Ember — dark charcoal + orange (default)
    { bg: '#1b1c1f', term: '#131417', text: '#f7ffff', accent: '#f99538', special: '#3845f9' },
    // Midnight — deep navy + sky blue + emerald
    { bg: '#0b1120', term: '#070d18', text: '#e4f0fb', accent: '#38bdf8', special: '#34d399' },
    // Forest — deep green + mint
    { bg: '#0d1a0f', term: '#091309', text: '#e8f5e9', accent: '#52b788', special: '#95d5b2' },
    // Amethyst — deep purple + lavender
    { bg: '#160d2e', term: '#0f0820', text: '#ede9fe', accent: '#c084fc', special: '#818cf8' },
    // Rose — dark red + rose + amber
    { bg: '#1f0a10', term: '#160608', text: '#fff1f2', accent: '#fb7185', special: '#fbbf24' },
    // Desert — warm dark brown + gold
    { bg: '#1c1510', term: '#130e09', text: '#fef3e2', accent: '#e9c46a', special: '#f4a261' },
];

const root = document.documentElement;
let currentIndex = 0;

function applyScheme(scheme) {
    root.style.setProperty('--bg-color',        scheme.bg);
    root.style.setProperty('--bg-term',         scheme.term);
    root.style.setProperty('--main-font',       scheme.text);
    root.style.setProperty('--secondary-font',  scheme.accent);
    root.style.setProperty('--special-text',    scheme.special);
}

document.getElementById('shuffle-btn').addEventListener('click', () => {
    let next;
    do { next = Math.floor(Math.random() * schemes.length); }
    while (next === currentIndex);
    currentIndex = next;

    applyScheme(schemes[currentIndex]);
    document.dispatchEvent(new Event('schemechange'));

    // Spin the icon
    const icon = document.querySelector('#shuffle-btn i');
    icon.style.transform = 'rotate(540deg)';
    setTimeout(() => {
        icon.style.transition = 'none';
        icon.style.transform = 'rotate(0deg)';
        setTimeout(() => { icon.style.transition = ''; }, 50);
    }, 450);
});
