const canvas = document.getElementById('binary-rain');
const ctx    = canvas.getContext('2d');
const btn    = document.getElementById('binary-btn');

const FONT_SIZE = 16;
const FPS       = 18;
const INTERVAL  = 1000 / FPS;

let drops   = [];
let animId  = null;
let active  = false;
let lastTs  = 0;

// ── Setup ─────────────────────────────────────────────────────────

function getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function buildDrops() {
    const cols = Math.floor(canvas.width / FONT_SIZE);
    drops = Array.from({ length: cols }, (_, i) => ({
        col:      i,
        y:        Math.random() * -(canvas.height / FONT_SIZE) * 1.5,
        speed:    0.3 + Math.random() * 0.8,
        trail:    [],
        maxTrail: 10 + Math.floor(Math.random() * 16),
    }));
}

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildDrops();
}

// ── Draw ──────────────────────────────────────────────────────────

function frame(ts) {
    if (!active) return;
    animId = requestAnimationFrame(frame);
    if (ts - lastTs < INTERVAL) return;
    lastTs = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

    const accent = getVar('--secondary-font');

    for (const d of drops) {
        // Push current head into trail
        d.trail.unshift(d.y);
        if (d.trail.length > d.maxTrail) d.trail.pop();

        // Draw fading trail (skip index 0 — that's the head)
        for (let i = 1; i < d.trail.length; i++) {
            const ty = d.trail[i];
            if (ty < 0) continue;
            ctx.globalAlpha = (1 - i / d.maxTrail) * 0.6;
            ctx.fillStyle   = accent;
            ctx.fillText(
                Math.random() > 0.5 ? '1' : '0',
                d.col * FONT_SIZE,
                ty * FONT_SIZE
            );
        }

        // Draw bright white head
        if (d.y >= 0) {
            ctx.globalAlpha = 0.92;
            ctx.fillStyle   = '#ffffff';
            ctx.fillText(
                Math.random() > 0.5 ? '1' : '0',
                d.col * FONT_SIZE,
                d.y * FONT_SIZE
            );
        }

        ctx.globalAlpha = 1;

        // Advance
        d.y += d.speed;

        // Reset when fully off-screen (including trail)
        if (d.y * FONT_SIZE > canvas.height + d.maxTrail * FONT_SIZE) {
            d.y       = Math.random() * -30;
            d.trail   = [];
            d.speed   = 0.3 + Math.random() * 0.8;
            d.maxTrail = 10 + Math.floor(Math.random() * 16);
        }
    }
}

// ── Toggle ────────────────────────────────────────────────────────

function start() {
    active = true;
    resize();
    canvas.style.display = 'block';
    requestAnimationFrame(frame);
}

function stop() {
    active = false;
    cancelAnimationFrame(animId);
    animId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = 'none';
}

btn.addEventListener('click', () => {
    if (active) {
        stop();
        btn.classList.remove('active');
    } else {
        start();
        btn.classList.add('active');
    }
});

window.addEventListener('resize', () => { if (active) resize(); });
