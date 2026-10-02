"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LAYOUT_THEME = exports.CSS_SIZE_EXCEPTION = void 0;
// css custom properties doesn't support decimal numbers in name
exports.CSS_SIZE_EXCEPTION = {
    '0.5': 'half',
};
exports.DEFAULT_LAYOUT_THEME = {
    breakpoints: {
        xs: 0,
        s: 576,
        m: 768,
        // TODO BREAKING CHANGE: Set l to 980
        l: 1080,
        xl: 1200,
        xxl: 1400,
        xxxl: 1920,
    },
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 3,
            media: {
                l: {
                    gutters: 5,
                },
            },
        },
    },
};
//# sourceMappingURL=constants.js.map
