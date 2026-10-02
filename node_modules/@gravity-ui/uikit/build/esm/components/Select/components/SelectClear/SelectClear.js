import { jsx as _jsx } from "react/jsx-runtime";
import { Xmark } from '@gravity-ui/icons';
import { Icon } from "../../../Icon/index.js";
import { SelectQa, selectClearBlock } from "../../constants.js";
import i18n from "../../i18n/index.js";
import "./SelectClear.css";
export const SelectClear = (props) => {
    const { size, onClick, onMouseEnter, onMouseLeave, renderIcon } = props;
    const { t } = i18n.useTranslation();
    const icon = renderIcon ? (renderIcon()) : (_jsx(Icon, { className: selectClearBlock('clear'), data: Xmark }));
    return (_jsx("button", { className: selectClearBlock({ size }), "aria-label": t('label_clear'), onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, "data-qa": SelectQa.CLEAR, type: "button", children: icon }));
};
SelectClear.displayName = 'SelectClear';
//# sourceMappingURL=SelectClear.js.map
