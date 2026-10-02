'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Xmark } from '@gravity-ui/icons';
import { Button } from "../../../Button/index.js";
import { Icon } from "../../../Icon/index.js";
import { block } from "../../../utils/cn.js";
import i18n from "./i18n/index.js";
import "./ClearButton.css";
const b = block('clear-button');
const ICON_SIZE = 16;
export const mapTextInputSizeToButtonSize = (textInputSize) => {
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
export const ClearButton = (props) => {
    const { size, className, onClick } = props;
    /**
     * Turn off event onBlur on input when use clear button
     */
    const preventDefaultHandler = (event) => {
        event.preventDefault();
    };
    const { t } = i18n.useTranslation();
    return (_jsx(Button, { size: size, className: b(null, className), onClick: onClick, onMouseDown: preventDefaultHandler, "aria-label": t('label_clear-button'), children: _jsx(Icon, { data: Xmark, size: ICON_SIZE }) }));
};
//# sourceMappingURL=ClearButton.js.map
