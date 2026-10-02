"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defsByPlatform = void 0;
const PcNormalizeMap = {
    arrowup: 'up',
    arrowdown: 'down',
    arrowleft: 'left',
    arrowright: 'right',
    esc: 'escape',
    return: 'enter',
    mod: 'ctrl',
    control: 'ctrl',
    opt: 'alt',
    option: 'alt',
    cmd: 'ctrl',
    command: 'ctrl',
};
const MacNormalizeMap = {
    arrowup: 'up',
    arrowdown: 'down',
    arrowleft: 'left',
    arrowright: 'right',
    esc: 'escape',
    enter: 'return',
    mod: 'command',
    ctrl: 'control',
    alt: 'option',
    opt: 'option',
    cmd: 'command',
};
const PcDisplayName = {
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
    escape: 'Esc',
    plus: '＋',
    minus: '－',
    enter: 'Enter',
    ctrl: 'Ctrl',
    alt: 'Alt',
    shift: 'Shift',
    tab: 'Tab',
    backspace: 'Backspace',
};
const MacDisplayName = {
    up: '▲',
    down: '▼',
    left: '◀',
    right: '▶',
    escape: 'esc',
    plus: '＋',
    minus: '－',
    return: '⏎',
    command: '⌘',
    option: '⌥',
    control: '⌃',
    shift: '⇧',
    backspace: '⌫',
    tab: '⇥',
};
const PcKeyPriority = {
    shift: 200,
    alt: 300,
    ctrl: 400,
};
const MacKeyPriority = {
    command: 100,
    shift: 200,
    option: 300,
    control: 400,
};
exports.defsByPlatform = {
    pc: {
        NormalizeMap: PcNormalizeMap,
        Priority: PcKeyPriority,
        DisplayName: PcDisplayName,
    },
    mac: {
        NormalizeMap: MacNormalizeMap,
        Priority: MacKeyPriority,
        DisplayName: MacDisplayName,
    },
};
//# sourceMappingURL=definitions.js.map
