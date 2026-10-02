'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsMore = BreadcrumbsMore;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const DropdownMenu_1 = require("../../DropdownMenu/index.js");
const cn_1 = require("../../utils/cn.js");
const BreadcrumbsButton_1 = require("./BreadcrumbsButton.js");
const i18n_1 = tslib_1.__importDefault(require("./i18n/index.js"));
const b = (0, cn_1.block)('breadcrumbs-legacy');
function BreadcrumbsMore({ popupStyle, popupPlacement, items }) {
    const { t } = i18n_1.default.useTranslation();
    return ((0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenu, { items: items, popupProps: {
            className: b('popup', {
                staircase: popupStyle === 'staircase',
            }),
            placement: popupPlacement,
        }, renderSwitcher: ({ onClick }) => ((0, jsx_runtime_1.jsx)(BreadcrumbsButton_1.BreadcrumbsButton, { title: t('label_more'), onClick: onClick, children: "..." })) }));
}
BreadcrumbsMore.displayName = 'Breadcrumbs.More';
//# sourceMappingURL=BreadcrumbsMore.js.map
