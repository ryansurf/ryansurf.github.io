const output    = document.getElementById('output');
const input     = document.getElementById('cmd-input');
const panel     = document.getElementById('term-panel');
const toggle    = document.getElementById('term-toggle');

let history      = [];
let historyIndex = -1;

// ── Collapse / expand ─────────────────────────────────────────────

toggle.addEventListener('click', () => {
    panel.classList.toggle('collapsed');
    if (!panel.classList.contains('collapsed')) {
        input.focus();
    }
});

// ── Output helpers ────────────────────────────────────────────────

function addLine(text, cls) {
    const div = document.createElement('div');
    if (!text && text !== 0) {
        div.className = 't-line t-line-blank';
    } else {
        div.className = 't-line ' + (cls || '');
        div.textContent = text;
    }
    output.appendChild(div);
}

function addHTML(html, cls) {
    const div = document.createElement('div');
    div.className = 't-line ' + (cls || '');
    div.innerHTML = html;
    output.appendChild(div);
}

function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

// ── Commands ──────────────────────────────────────────────────────

const commands = {

    help() {
        addLine();
        addLine('available commands:', 't-line-accent');
        addLine();
        addLine('  about     who I am');
        addLine('  skills    technical skills');
        addLine('  links     LinkedIn, GitHub, and resume');
        addLine('  whoami    short intro');
        addLine('  echo      echo text back');
        addLine('  clear     clear the terminal');
        addLine();
    },

    about() {
        addLine();
        addLine("I'm a recent graduate from UC Santa Cruz with a degree in");
        addLine('Technology and Information Management and a minor in CS.');
        addLine();
        addLine('Interests: networking, automation, web development.');
        addLine();
        addLine('Previously a Web Development intern at Callaway Golf,');
        addLine('working on the Travis Mathew eCommerce platform.');
        addLine();
        addLine('Outside of work: surfing, camping, traveling, reading.');
        addLine();
    },

    skills() {
        addLine();
        addLine('Python   C/C++   JavaScript   HTML/CSS   React', 't-line-accent');
        addLine('SQL      Networking   Git   Bash', 't-line-accent');
        addLine();
    },

    links() {
        addLine();
        addHTML('  LinkedIn  →  <a href="http://www.linkedin.com/in/ryanfreder" target="_blank">linkedin.com/in/ryanfreder</a>');
        addHTML('  GitHub    →  <a href="http://www.github.com/ryansurf" target="_blank">github.com/ryansurf</a>');
        addHTML('  Resume    →  <a href="/resume.pdf" target="_blank">resume.pdf</a>');
        addLine();
    },

    whoami() {
        addLine();
        addLine('Ryan Frederich — Software Engineer', 't-line-accent');
        addLine();
    },

    clear() {
        output.innerHTML = '';
    },

};

// ── Command runner ────────────────────────────────────────────────

function run(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    history.unshift(trimmed);
    historyIndex = -1;

    const cmdLine = document.createElement('div');
    cmdLine.className = 't-line t-line-cmd';
    cmdLine.textContent = trimmed;
    output.appendChild(cmdLine);

    const [cmd, ...args] = trimmed.split(' ');

    if (cmd === 'echo') {
        addLine(args.join(' '));
    } else if (commands[cmd]) {
        commands[cmd]();
    } else {
        addLine(`command not found: ${cmd}  (try 'help')`, 't-line-error');
    }

    scrollToBottom();
}

// ── Input events ──────────────────────────────────────────────────

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        run(input.value);
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        } else {
            historyIndex = -1;
            input.value = '';
        }
    }
});

// Clicking the terminal body focuses the input
document.getElementById('term-panel').addEventListener('click', (e) => {
    if (!panel.classList.contains('collapsed')) {
        input.focus();
    }
});

// ── Welcome message ───────────────────────────────────────────────

addLine("type 'help' to see available commands.", 't-line-accent');
