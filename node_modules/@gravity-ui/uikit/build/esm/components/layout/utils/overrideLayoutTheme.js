import merge from "lodash/merge.js";
/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export function overrideLayoutTheme({ theme, override }) {
    return merge(theme, override);
}
//# sourceMappingURL=overrideLayoutTheme.js.map
