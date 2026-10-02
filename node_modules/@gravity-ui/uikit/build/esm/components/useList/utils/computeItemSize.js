import { modToHeight } from "../constants.js";
export const computeItemSize = (size, hasSubRows = false) => {
    return modToHeight[size][Number(hasSubRows)];
};
//# sourceMappingURL=computeItemSize.js.map
