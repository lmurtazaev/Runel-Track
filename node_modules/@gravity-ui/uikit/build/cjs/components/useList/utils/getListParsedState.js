"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListParsedState = getListParsedState;
const getListItemId_1 = require("./getListItemId.js");
const groupItemId_1 = require("./groupItemId.js");
const isTreeItemGuard_1 = require("./isTreeItemGuard.js");
function getListParsedState({ items, defaultExpandedState = 'expanded', getItemId, }) {
    const result = {
        itemsById: {},
        groupsState: {},
        itemsState: {},
        initialState: {
            disabledById: {},
            selectedById: {},
            expandedById: {},
        },
    };
    const traverseItem = ({ item, index }) => {
        const id = (0, getListItemId_1.getListItemId)({ groupedId: String(index), item, getItemId });
        result.itemsById[id] = item;
        if (!result.itemsState[id]) {
            result.itemsState[id] = {
                indentation: 0,
            };
        }
        if (item && typeof item === 'object') {
            if ('selected' in item && typeof item.selected === 'boolean') {
                result.initialState.selectedById[id] = item.selected;
            }
            if ('disabled' in item && typeof item.disabled === 'boolean') {
                result.initialState.disabledById[id] = item.disabled;
            }
        }
    };
    const traverseTreeItem = ({ item, index, parentGroupedId, parentId, }) => {
        const groupedId = (0, groupItemId_1.getGroupItemId)(index, parentGroupedId);
        const id = (0, getListItemId_1.getListItemId)({ groupedId, item, getItemId });
        if (parentId) {
            result.groupsState[parentId].childrenIds.push(id);
        }
        result.itemsById[id] = item.data;
        if (!result.itemsState[id]) {
            result.itemsState[id] = {
                indentation: 0,
            };
        }
        if (typeof parentId !== 'undefined') {
            result.itemsState[id].parentId = parentId;
        }
        if (typeof item.selected !== 'undefined') {
            result.initialState.selectedById[id] = item.selected;
        }
        if (typeof item.disabled !== 'undefined') {
            result.initialState.disabledById[id] = item.disabled;
        }
        if (groupedId) {
            result.itemsState[id].indentation = (0, groupItemId_1.parseGroupItemId)(groupedId).length - 1;
        }
        if (item.children) {
            result.groupsState[id] = {
                childrenIds: [],
            };
            if (result.initialState.expandedById) {
                if (typeof item.expanded === 'undefined') {
                    result.initialState.expandedById[id] = defaultExpandedState === 'expanded';
                }
                else {
                    result.initialState.expandedById[id] = item.expanded;
                }
            }
            item.children.forEach((treeItem, index) => {
                traverseTreeItem({
                    item: treeItem,
                    index,
                    parentGroupedId: groupedId,
                    parentId: id,
                });
            });
        }
    };
    items.forEach((item, index) => (0, isTreeItemGuard_1.isTreeItemGuard)(item) ? traverseTreeItem({ item, index }) : traverseItem({ item, index }));
    return result;
}
//# sourceMappingURL=getListParsedState.js.map
