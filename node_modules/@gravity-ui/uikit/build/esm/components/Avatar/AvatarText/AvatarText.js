import { jsx as _jsx } from "react/jsx-runtime";
import { bAvatar } from "../constants.js";
import { getAvatarDisplayText } from "./utils.js";
export const AvatarText = ({ text, color, size }) => {
    const style = { color };
    const displayText = getAvatarDisplayText(text, size);
    return (_jsx("div", { className: bAvatar('text'), style: style, children: displayText }));
};
//# sourceMappingURL=AvatarText.js.map
