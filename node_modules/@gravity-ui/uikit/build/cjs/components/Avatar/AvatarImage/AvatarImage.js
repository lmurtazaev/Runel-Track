'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarImage = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../constants.js");
const AvatarImage = ({ imgUrl, fallbackImgUrl, sizes, srcSet, alt, loading, withImageBorder, size, }) => {
    const [isErrored, setIsErrored] = React.useState(false);
    const handleError = React.useCallback(() => {
        setIsErrored(true);
    }, []);
    // Reset error if `imgUrl` was changed to check it again
    React.useEffect(() => {
        setIsErrored(false);
    }, [imgUrl]);
    return ((0, jsx_runtime_1.jsx)("img", { className: (0, constants_1.bAvatar)('image', { 'with-border': withImageBorder }), loading: loading, width: constants_1.AVATAR_SIZES[size], height: constants_1.AVATAR_SIZES[size], src: fallbackImgUrl && isErrored ? fallbackImgUrl : imgUrl, sizes: sizes, srcSet: srcSet, alt: alt, onError: handleError }));
};
exports.AvatarImage = AvatarImage;
//# sourceMappingURL=AvatarImage.js.map
