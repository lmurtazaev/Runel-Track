'use client';
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Ellipsis } from '@gravity-ui/icons';
import { Button } from "../../Button/index.js";
import { DropdownMenu } from "../../DropdownMenu/index.js";
import { Icon } from "../../Icon/index.js";
import { block } from "../../utils/cn.js";
import i18n from "../i18n/index.js";
import { OBSERVER_TARGET_ATTR, useCollapseActions } from "./hooks/index.js";
import "./CollapseActions.css";
const b = block('actions-panel-collapse');
export const CollapseActions = ({ actions, maxRowActions }) => {
    const { buttonActions, dropdownItems, parentRef, offset, visibilityMap, showDropdown } = useCollapseActions(actions, maxRowActions);
    const { t } = i18n.useTranslation();
    return (_jsxs("div", { className: b(), children: [_jsx("div", { className: b('container'), ref: parentRef, children: buttonActions.map((action) => {
                    const { id } = action;
                    const attr = { [OBSERVER_TARGET_ATTR]: id };
                    const invisible = visibilityMap[id] === false;
                    const node = Array.isArray(action.dropdown.item.items) ? (_jsx(DropdownMenu, { size: "s", items: action.dropdown.item.items, renderSwitcher: ({ onClick }) => (_jsx(Button, { view: "flat-contrast", size: "m", ...action.button.props, onClick: onClick })), onSwitcherClick: action.button.props.onClick })) : (_jsx(Button, { view: "flat-contrast", size: "m", ...action.button.props }));
                    return (_createElement("div", { className: b('button-action-wrapper', { invisible }), ...attr, key: id }, node));
                }) }), showDropdown && (_jsxs(React.Fragment, { children: [_jsx("div", { className: b('menu-placeholder') }), _jsx("div", { className: b('menu-wrapper'), style: { insetInlineStart: offset }, children: _jsx(DropdownMenu, { size: "s", items: dropdownItems, renderSwitcher: ({ onClick }) => (_jsx(Button, { view: "flat-contrast", size: "m", "aria-label": t('label_more'), onClick: onClick, children: _jsx(Icon, { data: Ellipsis }) })) }) })] }))] }));
};
//# sourceMappingURL=CollapseActions.js.map
