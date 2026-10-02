"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectClear = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../../Icon/index.js");
const constants_1 = require("../../constants.js");
const i18n_1 = tslib_1.__importDefault(require("../../i18n/index.js"));
require("./SelectClear.css");
const SelectClear = (props) => {
    const { size, onClick, onMouseEnter, onMouseLeave, renderIcon } = props;
    const { t } = i18n_1.default.useTranslation();
    const icon = renderIcon ? (renderIcon()) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { className: (0, constants_1.selectClearBlock)('clear'), data: icons_1.Xmark }));
    return ((0, jsx_runtime_1.jsx)("button", { className: (0, constants_1.selectClearBlock)({ size }), "aria-label": t('label_clear'), onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, "data-qa": constants_1.SelectQa.CLEAR, type: "button", children: icon }));
};
exports.SelectClear = SelectClear;
exports.SelectClear.displayName = 'SelectClear';
//# sourceMappingURL=SelectClear.js.map
