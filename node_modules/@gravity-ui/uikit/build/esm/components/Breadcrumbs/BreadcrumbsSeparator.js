import { jsx as _jsx } from "react/jsx-runtime";
import { b } from "./utils.js";
export function BreadcrumbsSeparator({ separator }) {
    return (_jsx("div", { "aria-hidden": true, className: b('divider'), children: separator ?? '/' }));
}
BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
//# sourceMappingURL=BreadcrumbsSeparator.js.map
