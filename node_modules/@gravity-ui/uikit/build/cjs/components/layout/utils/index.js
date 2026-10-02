"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCssMod = exports.getClosestMediaPropsFactory = exports.isMediaActiveFactory = void 0;
const constants_1 = require("../constants.js");
const mediaByOrder = {
    xs: 0,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    xxl: 5,
    xxxl: 6,
};
const isMediaActiveFactory = (activeType) => (toCheck) => {
    return activeType in mediaByOrder
        ? mediaByOrder[activeType] - mediaByOrder[toCheck] >= 0
        : false;
};
exports.isMediaActiveFactory = isMediaActiveFactory;
const mediaOrder = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
const getClosestMediaPropsFactory = (currentActive) => (medias = {}) => {
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
exports.getClosestMediaPropsFactory = getClosestMediaPropsFactory;
const makeCssMod = (space) => {
    return space in constants_1.CSS_SIZE_EXCEPTION ? constants_1.CSS_SIZE_EXCEPTION[space] : String(space);
};
exports.makeCssMod = makeCssMod;
//# sourceMappingURL=index.js.map
