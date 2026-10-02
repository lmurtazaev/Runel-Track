"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericArrows = NumericArrows;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../Button/index.js");
const Icon_1 = require("../../Icon/index.js");
const layout_1 = require("../../layout/index.js");
const cn_1 = require("../../utils/cn.js");
const i18n_1 = tslib_1.__importDefault(require("../i18n/index.js"));
const utils_1 = require("../utils.js");
require("./NumericArrows.css");
const b = (0, cn_1.block)('numeric-arrows');
function NumericArrows({ className, size, disabled, onUpClick, onDownClick, ...restProps }) {
    const commonBtnProps = {
        size: 's',
        pin: 'brick-brick',
        view: 'flat-secondary',
        disabled,
        tabIndex: -1,
        width: 'max',
        'aria-hidden': 'true',
    };
    const { t } = i18n_1.default.useTranslation();
    return ((0, jsx_runtime_1.jsxs)(layout_1.Flex, { direction: "column", className: b({ size }, className), qa: utils_1.CONTROL_BUTTONS_QA, ...restProps, children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { className: b('arrow-btn'), qa: utils_1.INCREMENT_BUTTON_QA, ...commonBtnProps, onClick: onUpClick, "aria-label": t('label_increment'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.ChevronUp, size: 12 }) }), (0, jsx_runtime_1.jsx)("span", { className: b('separator') }), (0, jsx_runtime_1.jsx)(Button_1.Button, { className: b('arrow-btn'), qa: utils_1.DECREMENT_BUTTON_QA, ...commonBtnProps, onClick: onDownClick, "aria-label": t('label_decrement'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.ChevronDown, size: 12 }) })] }));
}
//# sourceMappingURL=NumericArrows.js.map
