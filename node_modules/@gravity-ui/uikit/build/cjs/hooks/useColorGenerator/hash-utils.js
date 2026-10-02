"use strict";
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractHashPart = exports.normalizeHash = exports.getHash = exports.getHue = void 0;
const getHue = (hash) => {
    return (Math.abs(hash) % 36000) / 100;
};
exports.getHue = getHue;
const getHash = (seed) => {
    // FNV-1a offset basis
    let hash = 0x811c9dc5;
    const len = seed.length;
    hash ^= len;
    hash = Math.imul(hash, 0x01000193);
    for (let i = 0; i < len; i++) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x27d4eb2d);
    hash ^= hash >>> 15;
    return hash | 0;
};
exports.getHash = getHash;
const normalizeHash = (hash, min, max) => {
    const absHash = Math.abs(hash);
    return Math.floor((absHash % (max - min + 1)) + min);
};
exports.normalizeHash = normalizeHash;
const extractHashPart = (hash, offset) => {
    // mix hash with offset to get independent values
    let part = hash ^ (offset * 0x9e3779b9);
    // mix to improve distribution
    part ^= part >>> 16;
    part = Math.imul(part, 0x85ebca6b);
    part ^= part >>> 13;
    part = Math.imul(part, 0xc2b2ae35);
    part ^= part >>> 16;
    return part >>> 0;
};
exports.extractHashPart = extractHashPart;
//# sourceMappingURL=hash-utils.js.map
