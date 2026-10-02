import { jsx as _jsx } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { Icon } from "../Icon/index.js";
import { useDirection } from "../theme/index.js";
import { b } from "./utils.js";
export const StepperSeparator = ({ separator }) => {
    const direction = useDirection();
    return (_jsx("div", { className: b('separator'), "aria-hidden": true, children: separator ?? _jsx(Icon, { data: direction === 'rtl' ? ChevronLeft : ChevronRight }) }));
};
//# sourceMappingURL=StepperSeparator.js.map
