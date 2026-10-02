import { jsx as _jsx } from "react/jsx-runtime";
import { Icon } from "../../Icon/index.js";
import { bAvatar } from "../constants.js";
const avatarSizeToIconSize = {
    '3xs': 10,
    '2xs': 12,
    xs: 14,
    s: 16,
    m: 16,
    l: 20,
    xl: 24,
};
export const AvatarIcon = ({ icon, color, size }) => {
    const style = { color };
    return (_jsx("div", { className: bAvatar('icon'), style: style, children: _jsx(Icon, { data: icon, size: avatarSizeToIconSize[size] }) }));
};
//# sourceMappingURL=AvatarIcon.js.map
