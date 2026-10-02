"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPluralValue = exports.PluralForm = void 0;
var PluralForm;
(function (PluralForm) {
    PluralForm[PluralForm["One"] = 0] = "One";
    PluralForm[PluralForm["Few"] = 1] = "Few";
    PluralForm[PluralForm["Many"] = 2] = "Many";
    PluralForm[PluralForm["None"] = 3] = "None";
})(PluralForm || (exports.PluralForm = PluralForm = {}));
function isPluralValue(value) {
    return typeof value !== 'string';
}
exports.isPluralValue = isPluralValue;
