import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronUp } from '@gravity-ui/icons';
import { Button } from "../../Button/index.js";
import { Icon } from "../../Icon/index.js";
import { Flex } from "../../layout/index.js";
import { block } from "../../utils/cn.js";
import i18n from "../i18n/index.js";
import { CONTROL_BUTTONS_QA, DECREMENT_BUTTON_QA, INCREMENT_BUTTON_QA } from "../utils.js";
import "./NumericArrows.css";
const b = block('numeric-arrows');
export function NumericArrows({ className, size, disabled, onUpClick, onDownClick, ...restProps }) {
    const commonBtnProps = {
        size: 's',
        pin: 'brick-brick',
        view: 'flat-secondary',
        disabled,
        tabIndex: -1,
        width: 'max',
        'aria-hidden': 'true',
    };
    const { t } = i18n.useTranslation();
    return (_jsxs(Flex, { direction: "column", className: b({ size }, className), qa: CONTROL_BUTTONS_QA, ...restProps, children: [_jsx(Button, { className: b('arrow-btn'), qa: INCREMENT_BUTTON_QA, ...commonBtnProps, onClick: onUpClick, "aria-label": t('label_increment'), children: _jsx(Icon, { data: ChevronUp, size: 12 }) }), _jsx("span", { className: b('separator') }), _jsx(Button, { className: b('arrow-btn'), qa: DECREMENT_BUTTON_QA, ...commonBtnProps, onClick: onDownClick, "aria-label": t('label_decrement'), children: _jsx(Icon, { data: ChevronDown, size: 12 }) })] }));
}
//# sourceMappingURL=NumericArrows.js.map
