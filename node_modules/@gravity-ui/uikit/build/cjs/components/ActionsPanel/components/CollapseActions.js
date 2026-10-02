'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapseActions = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../Button/index.js");
const DropdownMenu_1 = require("../../DropdownMenu/index.js");
const Icon_1 = require("../../Icon/index.js");
const cn_1 = require("../../utils/cn.js");
const i18n_1 = tslib_1.__importDefault(require("../i18n/index.js"));
const hooks_1 = require("./hooks/index.js");
require("./CollapseActions.css");
const b = (0, cn_1.block)('actions-panel-collapse');
const CollapseActions = ({ actions, maxRowActions }) => {
    const { buttonActions, dropdownItems, parentRef, offset, visibilityMap, showDropdown } = (0, hooks_1.useCollapseActions)(actions, maxRowActions);
    const { t } = i18n_1.default.useTranslation();
    return ((0, jsx_runtime_1.jsxs)("div", { className: b(), children: [(0, jsx_runtime_1.jsx)("div", { className: b('container'), ref: parentRef, children: buttonActions.map((action) => {
                    const { id } = action;
                    const attr = { [hooks_1.OBSERVER_TARGET_ATTR]: id };
                    const invisible = visibilityMap[id] === false;
                    const node = Array.isArray(action.dropdown.item.items) ? ((0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenu, { size: "s", items: action.dropdown.item.items, renderSwitcher: ({ onClick }) => ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: "flat-contrast", size: "m", ...action.button.props, onClick: onClick })), onSwitcherClick: action.button.props.onClick })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: "flat-contrast", size: "m", ...action.button.props }));
                    return ((0, react_1.createElement)("div", { className: b('button-action-wrapper', { invisible }), ...attr, key: id }, node));
                }) }), showDropdown && ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: b('menu-placeholder') }), (0, jsx_runtime_1.jsx)("div", { className: b('menu-wrapper'), style: { insetInlineStart: offset }, children: (0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenu, { size: "s", items: dropdownItems, renderSwitcher: ({ onClick }) => ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: "flat-contrast", size: "m", "aria-label": t('label_more'), onClick: onClick, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Ellipsis }) })) }) })] }))] }));
};
exports.CollapseActions = CollapseActions;
//# sourceMappingURL=CollapseActions.js.map
