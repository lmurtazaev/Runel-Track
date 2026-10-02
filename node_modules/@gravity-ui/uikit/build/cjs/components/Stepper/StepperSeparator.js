"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepperSeparator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon/index.js");
const theme_1 = require("../theme/index.js");
const utils_1 = require("./utils.js");
const StepperSeparator = ({ separator }) => {
    const direction = (0, theme_1.useDirection)();
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.b)('separator'), "aria-hidden": true, children: separator ?? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: direction === 'rtl' ? icons_1.ChevronLeft : icons_1.ChevronRight }) }));
};
exports.StepperSeparator = StepperSeparator;
//# sourceMappingURL=StepperSeparator.js.map
