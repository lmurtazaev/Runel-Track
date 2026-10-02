"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseKeyGroups = parseKeyGroups;
const tslib_1 = require("tslib");
const capitalize_1 = tslib_1.__importDefault(require("lodash/capitalize.js"));
const uniqBy_1 = tslib_1.__importDefault(require("lodash/uniqBy.js"));
const utils_1 = require("./utils.js");
const GROUPS_SEPARATOR = /\s/;
const KEYS_SEPARATOR = '+';
function parseKeyGroups(defs, value) {
    return (0, utils_1.split)(value, GROUPS_SEPARATOR).map((keys) => (0, uniqBy_1.default)((0, utils_1.split)(keys, KEYS_SEPARATOR)
        .map(keyParser(defs))
        .sort((a, b) => b.priority - a.priority), // high to low
    (key) => key.id).map(renderKey));
}
function keyParser(defs) {
    return function (raw) {
        const keyId = getKeyId(defs, raw);
        return {
            raw,
            id: keyId,
            priority: defs.Priority[keyId] ?? 0,
            displayName: defs.DisplayName[keyId],
        };
    };
}
function getKeyId(defs, val) {
    val = val.toLowerCase();
    return defs.NormalizeMap[val] ?? val;
}
function renderKey(key) {
    return key.displayName ?? (0, capitalize_1.default)(key.id);
}
//# sourceMappingURL=parse.js.map
