import { jsx as _jsx } from "react/jsx-runtime";
import { useMobile } from "../../mobile/index.js";
import { DesktopActionsMenu } from "./DesktopActionsMenu/DesktopActionsMenu.js";
import { MobileActionsMenu } from "./MobileActionsMenu/MobileActionsMenu.js";
export const FilePreviewActions = ({ actions, fileName, hoverabelPanelClassName, isCustomImage, }) => {
    const mobile = useMobile();
    if (mobile) {
        return (_jsx(MobileActionsMenu, { actions: actions, fileName: fileName, isCustomImage: isCustomImage }));
    }
    return (_jsx(DesktopActionsMenu, { actions: actions, hoverabelPanelClassName: hoverabelPanelClassName }));
};
//# sourceMappingURL=FilePreviewActions.js.map
