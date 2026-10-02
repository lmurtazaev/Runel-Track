"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = exports.TEXT_VARIANTS = void 0;
const cn_1 = require("../../utils/cn.js");
require("./text.css");
const b = (0, cn_1.block)('text');
exports.TEXT_VARIANTS = [
    'display-4',
    'display-3',
    'display-2',
    'display-1',
    'header-2',
    'header-1',
    'subheader-3',
    'subheader-2',
    'subheader-1',
    'body-3',
    'body-2',
    'body-1',
    'body-short',
    'caption-2',
    'caption-1',
    'code-3',
    'code-inline-3',
    'code-2',
    'code-inline-2',
    'code-1',
    'code-inline-1',
];
/**
 * Utility to generate text classes.
 *
 * **Hint:** Hover on props in your editor to read jsdoc
 *
 * ---
 * ```jsx
 * // "text text_display1 some-class"
 * text({variant: 'display-1'}, 'some-class')`
 *```
 */
const text = ({ variant = 'body-1', ellipsis, ellipsisLines, whiteSpace, wordBreak }, className) => b({
    variant,
    ellipsis,
    ws: whiteSpace,
    wb: wordBreak,
    'ellipsis-lines': ellipsisLines,
}, className);
exports.text = text;
//# sourceMappingURL=text.js.map
