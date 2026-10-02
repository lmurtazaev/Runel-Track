"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupLabel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../../utils/cn.js");
const b = (0, cn_1.block)('select-list');
const GroupLabel = ({ option, renderOptionGroup }) => {
    if (renderOptionGroup) {
        return (0, jsx_runtime_1.jsx)("div", { className: b('group-label-custom'), children: renderOptionGroup(option) });
    }
    else {
        return ((0, jsx_runtime_1.jsx)("div", { className: b('group-label', { empty: option.label === '' }), children: (0, jsx_runtime_1.jsx)("div", { className: b('group-label-content'), children: option.label }) }));
    }
};
exports.GroupLabel = GroupLabel;
//# sourceMappingURL=GroupLabel.js.map
