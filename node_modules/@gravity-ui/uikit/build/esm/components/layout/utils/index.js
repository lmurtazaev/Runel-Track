import { CSS_SIZE_EXCEPTION } from "../constants.js";
const mediaByOrder = {
    xs: 0,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    xxl: 5,
    xxxl: 6,
};
export const isMediaActiveFactory = (activeType) => (toCheck) => {
    return activeType in mediaByOrder
        ? mediaByOrder[activeType] - mediaByOrder[toCheck] >= 0
        : false;
};
const mediaOrder = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
export const getClosestMediaPropsFactory = (currentActive) => (medias = {}) => {
    if (!currentActive) {
        return undefined;
    }
    let candidate = currentActive;
    while (candidate) {
        if (typeof medias[candidate] !== 'undefined') {
            return medias[candidate];
        }
        candidate = mediaOrder[mediaByOrder[candidate] - 1];
    }
    return undefined;
};
export const makeCssMod = (space) => {
    return space in CSS_SIZE_EXCEPTION ? CSS_SIZE_EXCEPTION[space] : String(space);
};
//# sourceMappingURL=index.js.map
