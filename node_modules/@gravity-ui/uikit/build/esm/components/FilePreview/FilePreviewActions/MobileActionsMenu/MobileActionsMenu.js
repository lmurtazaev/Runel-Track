import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { EllipsisVertical } from '@gravity-ui/icons';
import { Button } from "../../../Button/index.js";
import { Icon } from "../../../Icon/index.js";
import { List } from "../../../List/index.js";
import { Sheet } from "../../../Sheet/index.js";
import { Text } from "../../../Text/index.js";
import { block } from "../../../utils/cn.js";
import "./MobileActionsMenu.css";
const cn = block('file-preview-actions-mobile');
const renderListItem = (item) => {
    return (_jsxs("div", { className: cn('list-item'), children: [item.icon, _jsx(Text, { variant: "body-2", title: item.title, ellipsis: true, children: item.title })] }));
};
export const MobileActionsMenu = ({ actions, fileName, isCustomImage }) => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);
    const handleMobileMenuClose = React.useCallback(() => {
        setShowMobileMenu(false);
    }, []);
    const handleItemClick = React.useCallback((item, _, __, event) => {
        if (event) {
            // function can be called only on a mobile device
            item.onClick?.(event);
        }
        setShowMobileMenu(false);
    }, []);
    const handleMobileButtonClick = () => {
        setShowMobileMenu(true);
    };
    const buttonView = isCustomImage ? 'raised' : 'flat';
    return (_jsxs(React.Fragment, { children: [_jsx(Button, { view: buttonView, className: cn('actions-menu'), onClick: handleMobileButtonClick, size: "s", children: _jsx(Icon, { data: EllipsisVertical, height: 16, width: 16 }) }), _jsx(Sheet, { className: cn('sheet'), visible: showMobileMenu, onClose: handleMobileMenuClose, title: fileName, children: _jsx(List, { items: actions, filterable: false, renderItem: renderListItem, itemHeight: 44, virtualized: false, onItemClick: handleItemClick }) })] }));
};
//# sourceMappingURL=MobileActionsMenu.js.map
