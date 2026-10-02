"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationPageSizeOptionQa = exports.getPaginationPageQa = exports.PaginationQa = void 0;
exports.PaginationQa = {
    PaginationPageSizer: 'pagination-page-sizer',
    PaginationPageSizerOption: 'pagination-page-sizer-option',
    PaginationInput: 'pagination-input',
    PaginationPage: 'pagination-page',
    PaginationButtonFirst: 'pagination-button-first',
    PaginationButtonPrevious: 'pagination-button-previous',
    PaginationButtonNext: 'pagination-button-next',
};
const getPaginationPageQa = (pageNumber) => {
    return `${exports.PaginationQa.PaginationPage}-${pageNumber}`;
};
exports.getPaginationPageQa = getPaginationPageQa;
const getPaginationPageSizeOptionQa = (pageSizeOption) => {
    return `${exports.PaginationQa.PaginationPageSizerOption}-${pageSizeOption}`;
};
exports.getPaginationPageSizeOptionQa = getPaginationPageSizeOptionQa;
//# sourceMappingURL=constants.js.map
