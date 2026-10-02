import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../utils/cn.js";
const b = block('breadcrumbs-legacy');
export function BreadcrumbsSeparator({ renderItemDivider }) {
    return (_jsx("div", { "aria-hidden": true, className: b('divider'), children: renderItemDivider ? renderItemDivider() : '/' }));
}
BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
//# sourceMappingURL=BreadcrumbsSeparator.js.map
