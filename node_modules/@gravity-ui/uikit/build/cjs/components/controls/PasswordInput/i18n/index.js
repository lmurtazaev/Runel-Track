"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const tslib_1 = require("tslib");
const i18n_1 = require("../../../../i18n/index.js");
const en_json_1 = tslib_1.__importDefault(require("./en.json"));
const ru_json_1 = tslib_1.__importDefault(require("./ru.json"));
const COMPONENT = 'PasswordInput';
exports.i18n = (0, i18n_1.addComponentKeysets)({ en: en_json_1.default, ru: ru_json_1.default }, COMPONENT);
//# sourceMappingURL=index.js.map
