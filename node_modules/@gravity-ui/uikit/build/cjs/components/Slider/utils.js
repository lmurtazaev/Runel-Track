"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSliderInnerState = prepareSliderInnerState;
const constants_1 = require("./constants.js");
function prepareSingleValue({ value, min, max }) {
    if (typeof value === 'undefined' || value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
function prepareStartPoint({ min, max, startPoint, }) {
    if (startPoint === undefined) {
        return undefined;
    }
    return prepareSingleValue({ min, max, value: startPoint });
}
function prepareArrayValue({ value = [], min = 0, max = 100, }) {
    return [
        prepareSingleValue({ max, min, value: value[0] }),
        prepareSingleValue({ max, min, value: value[1] }),
    ].sort((v1, v2) => v1 - v2);
}
function calculateMarksArray({ count = 0, max, min }) {
    if (!count) {
        return [];
    }
    if (max === min) {
        return [min];
    }
    if (count === 1) {
        const step = Math.abs(max - min) / 2;
        return [Math.round((min + step) * 100) / 100];
    }
    if (count > 2) {
        const points = [];
        const step = Math.abs(max - min) / (count - 1);
        for (let i = 0; i < count; i++) {
            points.push(Math.round((min + step * i) * 100) / 100);
        }
        return points;
    }
    return [min, max];
}
function createMarks({ points, markFormat, min, max, }) {
    const marks = {};
    points.forEach((point) => {
        const pointContent = markFormat ? markFormat(point) : point;
        if (point === min || point === max) {
            marks[point] = { label: pointContent, style: constants_1.CLEAR_MARK_STYLE };
        }
        else {
            marks[point] = pointContent;
        }
    });
    return marks;
}
/**
 * Calculates the basic properties of the Slider component depending on the passed parameters
 * @returns {SliderInnerState} Properties to pass to the Slider
 */
function prepareSliderInnerState({ max = 100, min = 0, defaultValue, step, value, markFormat, marks, tooltipDisplay, tooltipFormat, startPoint, }) {
    const state = {
        value,
        defaultValue: defaultValue ?? min,
        range: false,
        max,
        min,
        step,
        tooltipDisplay,
    };
    state.tooltipFormat = tooltipFormat ? tooltipFormat : markFormat;
    if (max < min) {
        state.max = min;
        state.min = max;
    }
    if (Array.isArray(marks)) {
        state.marks = createMarks({ points: marks, markFormat, min: state.min, max: state.max });
    }
    else {
        state.marks =
            marks === 0
                ? {}
                : createMarks({
                    points: calculateMarksArray({ count: marks, max, min }),
                    markFormat,
                    min,
                    max,
                });
    }
    state.startPoint = prepareStartPoint({ min: state.min, max: state.max, startPoint });
    if (defaultValue === undefined) {
        state.defaultValue = state.startPoint === undefined ? state.min : state.startPoint;
    }
    if (value === undefined) {
        const isArray = Array.isArray(state.defaultValue);
        state.range = isArray;
        state.defaultValue = isArray
            ? prepareArrayValue({
                min: state.min,
                max: state.max,
                value: state.defaultValue,
            })
            : prepareSingleValue({
                min: state.min,
                max: state.max,
                value: state.defaultValue,
            });
    }
    else {
        const isArray = Array.isArray(value);
        state.range = isArray;
        state.value = isArray
            ? prepareArrayValue({ min: state.min, max: state.max, value })
            : prepareSingleValue({ min: state.min, max: state.max, value });
    }
    return state;
}
//# sourceMappingURL=utils.js.map
