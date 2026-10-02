import { block } from "../../utils/cn.js";
import { makeCssMod } from "../utils/index.js";
import "./spacing.css";
const b = block('s');
/**
 * Utility to generate predefined css classes to describe position between components
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#spacing-utility
 */
export const spacing = (props, className) => {
    const classes = [];
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const value = props[key];
            if (typeof value !== 'undefined') {
                classes.push(b(`${key}_${makeCssMod(value)}`));
            }
        }
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
// alias
export const sp = spacing;
//# sourceMappingURL=spacing.js.map
