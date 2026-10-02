"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpriteData = isSpriteData;
exports.isSvgrData = isSvgrData;
exports.isComponentSvgData = isComponentSvgData;
exports.isStringSvgData = isStringSvgData;
exports.prepareStringData = prepareStringData;
exports.getStringViewBox = getStringViewBox;
function isSpriteData(data) {
    return typeof data === 'object';
}
function isSvgrData(data) {
    return typeof data === 'function' && (!data.prototype || !data.prototype.render);
}
function isComponentSvgData(data) {
    return (typeof data === 'object' || typeof data === 'function') && 'defaultProps' in data;
}
function isStringSvgData(data) {
    return typeof data === 'string';
}
function prepareStringData(data) {
    return data.replace(/<svg[^>]*>/, (match) => {
        return match
            .replace(/(width|height)=(["']?)\d+\2/g, '')
            .replace(/(\s){2,}\b/g, '$1')
            .replace(/(\s)+>/g, '>');
    });
}
function getStringViewBox(data) {
    const match = data.match(/viewBox=(["']?)([\d\s,-]+)\1/);
    return match ? match[2] : undefined;
}
//# sourceMappingURL=utils.js.map
