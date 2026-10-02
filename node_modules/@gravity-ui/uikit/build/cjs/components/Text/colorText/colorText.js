"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorText = exports.TEXT_COLORS = void 0;
const cn_1 = require("../../utils/cn.js");
require("./colorText.css");
const b = (0, cn_1.block)('color-text');
exports.TEXT_COLORS = [
    'primary',
    'complementary',
    'secondary',
    'hint',
    'info',
    'info-heavy',
    'positive',
    'positive-heavy',
    'warning',
    'warning-heavy',
    'danger',
    'danger-heavy',
    'utility',
    'utility-heavy',
    'misc',
    'misc-heavy',
    'brand',
    'link',
    'link-hover',
    'link-visited',
    'link-visited-hover',
    'dark-primary',
    'dark-complementary',
    'dark-secondary',
    'light-primary',
    'light-complementary',
    'light-secondary',
    'light-hint',
    'inverted-primary',
    'inverted-complementary',
    'inverted-secondary',
    'inverted-hint',
];
/**
 * Utility to generate text colors classes.
 * Storybook: https://preview.gravity-ui.com/uikit/?path=/story/colors--texts
 *
 * ---
 * For example:
 * ```jsx
 * // "color-text color-text_color_inherit some-class"
 * colorText({color: 'inherit'}, 'some-class')
 * ```
 */
const colorText = ({ color }, className) => b({ color }, className);
exports.colorText = colorText;
//# sourceMappingURL=colorText.js.map
