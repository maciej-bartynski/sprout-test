import 'colors';

const frame = (message, color = 'cyan') => {
    const len = message.length + 4;
    let border = '';
    let space = '';
    for (let i = 0; i < len; i++) {
        border += '#';
        if (i === 0 || i === len - 1) {
            space += '#';
        } else {
            space += ' ';
        }
    }

    const toDisplay = [
        '',
        `   ${border}`,
        `   ${space}`,
        `   # ${message} #`,
        `   ${space}`,
        `   ${border}`,
        ''
    ].join('\n')[color];

    console.log(toDisplay);
};

const section = (title, message, color = 'blue') => {
    const msg = message ? `: ${message}.` : '';
    const toDisplay = `
## ${title.toUpperCase()}${msg} ##`[color];
    console.log(toDisplay);
};

const endsec = (title = '#', message = '#', color = 'blue') => {
    const msg = message ? `: ${message}.` : '';
    const startmsg = `## ${title.toUpperCase()}${msg} ##`;
    let toDisplay = '';
    for (let i = 0; i <= startmsg.length; i++) {
        toDisplay += '#';
    }

    console.log(`${toDisplay[color]}
`);
};

const info = (message, color = 'white') => {
    console.log(message[color]);
};

const warn = (message, color = 'yellow') => {
    console.log(`${'[warn]'[color]} ${message}`);
};

const fail = (message, color = 'red') => {
    console.log(`${'[fail]'[color]} ${message}`);
};

const ok = (message, color = 'green') => {
    console.log(`${'[ok]'[color]} ${message}`);
};

const strong = (message, color = 'magenta') => {
    const len = message.length + 4;
    let border = '';
    for (let i = 0; i < len; i++) {
        border += '#';
    }
    const toDisplay = [
        '',
        `   ${border}`,
        `   # ${message} #`,
        `   ${border}`,
        ''
    ].join('\n')[color];

    console.log(toDisplay);
};

export default {
    frame,
    section,
    endsec,
    info,
    warn,
    fail,
    ok,
    strong
};
