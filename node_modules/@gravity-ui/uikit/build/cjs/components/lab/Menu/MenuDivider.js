"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDivider = MenuDivider;
const jsx_runtime_1 = require("react/jsx-runtime");
const Divider_1 = require("../../Divider/index.js");
const cn_1 = require("../../utils/cn.js");
require("./MenuDivider.css");
const b = (0, cn_1.block)('lab-menu-divider');
function MenuDivider() {
    return (0, jsx_runtime_1.jsx)(Divider_1.Divider, { className: b() });
}
MenuDivider.displayName = 'Menu.Divider';
//# sourceMappingURL=MenuDivider.js.map
