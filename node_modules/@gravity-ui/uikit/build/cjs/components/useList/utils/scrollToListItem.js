"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToListItem = void 0;
const constants_1 = require("../constants.js");
const scrollToListItem = (itemId, containerElement) => {
    if (document) {
        const element = (containerElement || document).querySelector(`[${constants_1.LIST_ITEM_DATA_ATR}="${itemId}"]`);
        if (element) {
            element.scrollIntoView?.({
                block: 'nearest',
            });
        }
    }
};
exports.scrollToListItem = scrollToListItem;
//# sourceMappingURL=scrollToListItem.js.map
