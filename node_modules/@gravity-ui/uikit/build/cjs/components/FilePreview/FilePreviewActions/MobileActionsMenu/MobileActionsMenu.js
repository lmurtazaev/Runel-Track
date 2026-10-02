"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileActionsMenu = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../../Button/index.js");
const Icon_1 = require("../../../Icon/index.js");
const List_1 = require("../../../List/index.js");
const Sheet_1 = require("../../../Sheet/index.js");
const Text_1 = require("../../../Text/index.js");
const cn_1 = require("../../../utils/cn.js");
require("./MobileActionsMenu.css");
const cn = (0, cn_1.block)('file-preview-actions-mobile');
const renderListItem = (item) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: cn('list-item'), children: [item.icon, (0, jsx_runtime_1.jsx)(Text_1.Text, { variant: "body-2", title: item.title, ellipsis: true, children: item.title })] }));
};
const MobileActionsMenu = ({ actions, fileName, isCustomImage }) => {
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
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { view: buttonView, className: cn('actions-menu'), onClick: handleMobileButtonClick, size: "s", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.EllipsisVertical, height: 16, width: 16 }) }), (0, jsx_runtime_1.jsx)(Sheet_1.Sheet, { className: cn('sheet'), visible: showMobileMenu, onClose: handleMobileMenuClose, title: fileName, children: (0, jsx_runtime_1.jsx)(List_1.List, { items: actions, filterable: false, renderItem: renderListItem, itemHeight: 44, virtualized: false, onItemClick: handleItemClick }) })] }));
};
exports.MobileActionsMenu = MobileActionsMenu;
//# sourceMappingURL=MobileActionsMenu.js.map
