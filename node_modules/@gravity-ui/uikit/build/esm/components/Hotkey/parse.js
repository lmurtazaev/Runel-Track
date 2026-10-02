import capitalize from "lodash/capitalize.js";
import uniqBy from "lodash/uniqBy.js";
import { split } from "./utils.js";
const GROUPS_SEPARATOR = /\s/;
const KEYS_SEPARATOR = '+';
export function parseKeyGroups(defs, value) {
    return split(value, GROUPS_SEPARATOR).map((keys) => uniqBy(split(keys, KEYS_SEPARATOR)
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
    return key.displayName ?? capitalize(key.id);
}
//# sourceMappingURL=parse.js.map
