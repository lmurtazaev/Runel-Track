"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGroupItemId = exports.getGroupItemId = void 0;
const constants_1 = require("../constants.js");
const getGroupItemId = (index, parentId) => parentId ? `${parentId}${constants_1.GROUPED_ID_SEPARATOR}${index}` : `${index}`;
exports.getGroupItemId = getGroupItemId;
const parseGroupItemId = (id) => id.split(constants_1.GROUPED_ID_SEPARATOR);
exports.parseGroupItemId = parseGroupItemId;
//# sourceMappingURL=groupItemId.js.map
