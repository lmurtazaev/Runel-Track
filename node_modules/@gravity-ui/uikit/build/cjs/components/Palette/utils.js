"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaletteRows = getPaletteRows;
function getPaletteRows(options, columns) {
    if (columns <= 0) {
        throw new Error('Palette.getPaletteRows: number of columns must greater than 0');
    }
    const rows = [];
    let row = [];
    let column = 0;
    for (const option of options) {
        row.push(option);
        column += 1;
        if (column >= columns) {
            rows.push(row);
            row = [];
            column = 0;
        }
    }
    if (row.length > 0) {
        rows.push(row);
    }
    return rows;
}
//# sourceMappingURL=utils.js.map
