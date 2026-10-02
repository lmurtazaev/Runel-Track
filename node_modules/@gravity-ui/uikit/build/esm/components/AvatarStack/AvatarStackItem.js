import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../utils/cn.js";
const b = block('avatar-stack');
export const AvatarStackItem = ({ children, style }) => {
    return (_jsx("li", { className: b('item'), style: style, children: children }));
};
AvatarStackItem.displayName = 'AvatarStack.Item';
//# sourceMappingURL=AvatarStackItem.js.map
