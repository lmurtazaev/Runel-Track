"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCustomColor = exports.generateColor = exports.oklchToRgb = exports.linearToSrgb = void 0;
const constants_1 = require("./constants.js");
const hash_utils_1 = require("./hash-utils.js");
const linearToSrgb = (channel) => {
    if (channel <= 0.0031308) {
        return 12.92 * channel;
    }
    else {
        return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    }
};
exports.linearToSrgb = linearToSrgb;
const oklchToRgb = (l, c, h) => {
    // 1. Convert OKLCH to OKLab
    // Convert hue to radians
    const hRadians = (h * Math.PI) / 180;
    // Calculate a and b components
    const a = c * Math.cos(hRadians);
    const b = c * Math.sin(hRadians);
    // 2. Convert OKLab to linear RGB
    // OKLab to LMS
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;
    // LMS to linear RGB
    const lCubed = l_ * l_ * l_;
    const mCubed = m_ * m_ * m_;
    const sCubed = s_ * s_ * s_;
    const linearR = +4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
    const linearG = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
    const linearB = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed;
    // 3. Convert linear RGB to sRGB (with gamma correction)
    const red = Math.max(0, Math.min(255, Math.round(255 * (0, exports.linearToSrgb)(linearR))));
    const green = Math.max(0, Math.min(255, Math.round(255 * (0, exports.linearToSrgb)(linearG))));
    const blue = Math.max(0, Math.min(255, Math.round(255 * (0, exports.linearToSrgb)(linearB))));
    // Return clamped values in valid RGB range [0, 255]
    return [red, green, blue];
};
exports.oklchToRgb = oklchToRgb;
const generateColorFromRanges = (seed, lightnessRange, chromaRange) => {
    const hash = (0, hash_utils_1.getHash)(seed);
    const hue = (0, hash_utils_1.getHue)(hash);
    const saturationHash = (0, hash_utils_1.extractHashPart)(hash, 0);
    const lightnessHash = (0, hash_utils_1.extractHashPart)(hash, 1);
    const chroma = (0, hash_utils_1.normalizeHash)(saturationHash, chromaRange[0], chromaRange[1]);
    const lightness = (0, hash_utils_1.normalizeHash)(lightnessHash, lightnessRange[0], lightnessRange[1]);
    const [red, green, blue] = (0, exports.oklchToRgb)(lightness / 100, chroma / 100, hue);
    return {
        hash,
        oklch: {
            l: lightness,
            c: chroma,
            h: hue,
        },
        rgb: {
            r: red,
            g: green,
            b: blue,
        },
        textColor: `var(${constants_1.textColorVarName})`,
    };
};
const generateColor = ({ seed, theme }) => {
    const { lightness: lightnessRange, chroma: chromaRange } = constants_1.colorOptions[theme];
    return generateColorFromRanges(seed, lightnessRange, chromaRange);
};
exports.generateColor = generateColor;
const generateCustomColor = ({ seed, lightnessRange, chromaRange, }) => {
    return generateColorFromRanges(seed, lightnessRange, chromaRange);
};
exports.generateCustomColor = generateCustomColor;
//# sourceMappingURL=color.js.map
