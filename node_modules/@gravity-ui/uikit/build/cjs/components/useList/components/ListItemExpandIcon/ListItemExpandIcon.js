"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemExpandIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowToggle_1 = require("../../../ArrowToggle/index.js");
const Text_1 = require("../../../Text/index.js");
const cn_1 = require("../../../utils/cn.js");
require("./ListItemExpandIcon.css");
const b = (0, cn_1.block)('list-item-expand-icon');
const ListItemExpandIcon = ({ expanded, behavior = 'action', disabled, }) => {
    return ((0, jsx_runtime_1.jsx)(ArrowToggle_1.ArrowToggle, { direction: getIconDirection({ behavior, expanded }), className: b(null, (0, Text_1.colorText)({ color: disabled ? 'hint' : undefined })), size: 16 }));
};
exports.ListItemExpandIcon = ListItemExpandIcon;
function getIconDirection({ behavior, expanded, }) {
    if (expanded && behavior === 'action') {
        return 'top';
    }
    else if (expanded && behavior === 'state') {
        return 'bottom';
    }
    else if (expanded && behavior === 'state-inverse') {
        return 'bottom';
    }
    else if (behavior === 'action') {
        return 'bottom';
    }
    else if (behavior === 'state') {
        return 'right';
    }
    else if (behavior === 'state-inverse') {
        return 'left';
    }
    return 'bottom';
}
//# sourceMappingURL=ListItemExpandIcon.js.map
