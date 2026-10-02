import { LIST_ITEM_DATA_ATR } from "../constants.js";
export const scrollToListItem = (itemId, containerElement) => {
    if (document) {
        const element = (containerElement || document).querySelector(`[${LIST_ITEM_DATA_ATR}="${itemId}"]`);
        if (element) {
            element.scrollIntoView?.({
                block: 'nearest',
            });
        }
    }
};
//# sourceMappingURL=scrollToListItem.js.map
