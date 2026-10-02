export function isSpriteData(data) {
    return typeof data === 'object';
}
export function isSvgrData(data) {
    return typeof data === 'function' && (!data.prototype || !data.prototype.render);
}
export function isComponentSvgData(data) {
    return (typeof data === 'object' || typeof data === 'function') && 'defaultProps' in data;
}
export function isStringSvgData(data) {
    return typeof data === 'string';
}
export function prepareStringData(data) {
    return data.replace(/<svg[^>]*>/, (match) => {
        return match
            .replace(/(width|height)=(["']?)\d+\2/g, '')
            .replace(/(\s){2,}\b/g, '$1')
            .replace(/(\s)+>/g, '>');
    });
}
export function getStringViewBox(data) {
    const match = data.match(/viewBox=(["']?)([\d\s,-]+)\1/);
    return match ? match[2] : undefined;
}
//# sourceMappingURL=utils.js.map
