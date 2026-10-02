export var PluralForm;
(function (PluralForm) {
    PluralForm[PluralForm["One"] = 0] = "One";
    PluralForm[PluralForm["Few"] = 1] = "Few";
    PluralForm[PluralForm["Many"] = 2] = "Many";
    PluralForm[PluralForm["None"] = 3] = "None";
})(PluralForm || (PluralForm = {}));
export function isPluralValue(value) {
    return typeof value !== 'string';
}
