"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNestingTranslationsRegExp = exports.MAX_NESTING_DEPTH = exports.KEYSET_SEPARATOR = void 0;
exports.KEYSET_SEPARATOR = '::';
exports.MAX_NESTING_DEPTH = 1;
const getNestingTranslationsRegExp = () => new RegExp(/\$t{([^}]+)}/g);
exports.getNestingTranslationsRegExp = getNestingTranslationsRegExp;
