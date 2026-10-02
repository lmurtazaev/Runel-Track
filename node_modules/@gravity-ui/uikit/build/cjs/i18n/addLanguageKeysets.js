"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLanguageKeysets = addLanguageKeysets;
const i18n_1 = require("./i18n.js");
/**
 * Add keysets data for a specific language
 * @param language - language code
 * @param data - keyset data
 * @example
 * import {addLanguageKeysets} from '@gravity-ui/uikit/i18n';
 * import type {Keysets, PartialKeysets} from '@gravity-ui/uikit/i18n';
 *
 * // add all keysets data
 * addLanguageKeysets<Keysets>('rs', {
 *     Alert: {
 *         label_close: 'Затвори',
 *         // all other keys
 *     },
 *     // all other keysets
 * });
 *
 * // add some keysets data
 * addLanguageKeysets<PartialKeysets>('rs', {
 *     Alert: {
 *         label_close: 'Затвори',
 *     },
 * });
 */
function addLanguageKeysets(language, data) {
    i18n_1.i18n.registerKeysets(language, data);
}
//# sourceMappingURL=addLanguageKeysets.js.map
