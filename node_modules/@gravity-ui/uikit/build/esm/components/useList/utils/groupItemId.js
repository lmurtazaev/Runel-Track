import { GROUPED_ID_SEPARATOR } from "../constants.js";
export const getGroupItemId = (index, parentId) => parentId ? `${parentId}${GROUPED_ID_SEPARATOR}${index}` : `${index}`;
export const parseGroupItemId = (id) => id.split(GROUPED_ID_SEPARATOR);
//# sourceMappingURL=groupItemId.js.map
