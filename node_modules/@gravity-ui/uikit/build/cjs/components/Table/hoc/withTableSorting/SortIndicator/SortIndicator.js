"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortIndicator = SortIndicator;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../../../Icon/index.js");
function SortIndicator({ order }) {
    let icon;
    switch (order) {
        case 'asc':
            icon = icons_1.ArrowUp;
            break;
        case 'desc':
            icon = icons_1.ArrowDown;
            break;
        default:
            icon = icons_1.ArrowUpArrowDown;
    }
    return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icon, size: 14 });
}
//# sourceMappingURL=SortIndicator.js.map
