'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearButton = exports.mapTextInputSizeToButtonSize = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../../Button/index.js");
const Icon_1 = require("../../../Icon/index.js");
const cn_1 = require("../../../utils/cn.js");
const i18n_1 = tslib_1.__importDefault(require("./i18n/index.js"));
require("./ClearButton.css");
const b = (0, cn_1.block)('clear-button');
const ICON_SIZE = 16;
const mapTextInputSizeToButtonSize = (textInputSize) => {
    switch (textInputSize) {
        case 's': {
            return 'xs';
        }
        case 'm': {
            return 's';
        }
        case 'l': {
            return 'm';
        }
        case 'xl': {
            return 'l';
        }
        default: {
            throw new Error(`Unknown text input size "${textInputSize}"`);
        }
    }
};
exports.mapTextInputSizeToButtonSize = mapTextInputSizeToButtonSize;
const ClearButton = (props) => {
    const { size, className, onClick } = props;
    /**
     * Turn off event onBlur on input when use clear button
     */
    const preventDefaultHandler = (event) => {
        event.preventDefault();
    };
    const { t } = i18n_1.default.useTranslation();
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: size, className: b(null, className), onClick: onClick, onMouseDown: preventDefaultHandler, "aria-label": t('label_clear-button'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Xmark, size: ICON_SIZE }) }));
};
exports.ClearButton = ClearButton;
//# sourceMappingURL=ClearButton.js.map
