"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accordionDetailsBlock = exports.accordionSummaryTriggerBlock = exports.accordionSummaryBlock = exports.accordionItemBlock = exports.accordionBlock = void 0;
const cn_1 = require("../utils/cn.js");
exports.accordionBlock = (0, cn_1.block)('accordion');
exports.accordionItemBlock = (0, cn_1.block)('accordion-item');
exports.accordionSummaryBlock = (0, cn_1.block)('accordion-summary');
exports.accordionSummaryTriggerBlock = (0, exports.accordionSummaryBlock)('trigger');
exports.accordionDetailsBlock = (0, exports.accordionItemBlock)('details');
//# sourceMappingURL=constants.js.map
