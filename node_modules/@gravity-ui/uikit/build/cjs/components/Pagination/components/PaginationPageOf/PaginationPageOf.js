"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPageOf = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../../utils/cn.js");
const i18n_1 = tslib_1.__importDefault(require("../../i18n/index.js"));
require("./PaginationPageOf.css");
const b = (0, cn_1.block)('pagination-page-of');
const PaginationPageOf = ({ size, className }) => {
    const { t } = i18n_1.default.useTranslation();
    return (0, jsx_runtime_1.jsx)("div", { className: b({ size }, className), children: t('label_page-of') });
};
exports.PaginationPageOf = PaginationPageOf;
//# sourceMappingURL=PaginationPageOf.js.map
