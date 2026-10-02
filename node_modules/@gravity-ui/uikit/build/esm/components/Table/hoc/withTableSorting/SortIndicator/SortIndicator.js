import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, ArrowUpArrowDown } from '@gravity-ui/icons';
import { Icon } from "../../../../Icon/index.js";
export function SortIndicator({ order }) {
    let icon;
    switch (order) {
        case 'asc':
            icon = ArrowUp;
            break;
        case 'desc':
            icon = ArrowDown;
            break;
        default:
            icon = ArrowUpArrowDown;
    }
    return _jsx(Icon, { data: icon, size: 14 });
}
//# sourceMappingURL=SortIndicator.js.map
