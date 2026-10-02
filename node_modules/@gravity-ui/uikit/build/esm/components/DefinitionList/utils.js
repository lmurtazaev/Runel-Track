export function isUnbreakableOver(limit) {
    return function (value) {
        const posibleLines = value.split(/\s+/);
        return posibleLines.some((line) => line.length > limit);
    };
}
//# sourceMappingURL=utils.js.map
