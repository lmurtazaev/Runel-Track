import { getNestingTranslationsRegExp } from "./consts";
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["EmptyKeyset"] = "EMPTY_KEYSET";
    ErrorCode["EmptyLanguageData"] = "EMPTY_LANGUAGE_DATA";
    ErrorCode["KeysetNotFound"] = "KEYSET_NOT_FOUND";
    ErrorCode["MissingKey"] = "MISSING_KEY";
    ErrorCode["MissingKeyFor0"] = "MISSING_KEY_FOR_0";
    ErrorCode["MissingKeyParamsCount"] = "MISSING_KEY_PARAMS_COUNT";
    ErrorCode["MissingKeyPlurals"] = "MISSING_KEY_PLURALS";
    ErrorCode["MissingInheritedKey"] = "MISSING_INHERITED_KEY";
    ErrorCode["NestedPlural"] = "NESTED_PLURAL";
    ErrorCode["ExceedTranslationNestingDepth"] = "EXCEED_TRANSLATION_NESTING_DEPTH";
    ErrorCode["NoLanguageData"] = "NO_LANGUAGE_DATA";
})(ErrorCode || (ErrorCode = {}));
const codeValues = Object.values(ErrorCode);
export function mapErrorCodeToMessage(args) {
    const { code, fallbackLang, lang } = args;
    let message = `Using language ${lang}. `;
    switch (code) {
        case ErrorCode.EmptyKeyset: {
            message += `Keyset is empty.`;
            break;
        }
        case ErrorCode.EmptyLanguageData: {
            message += 'Language data is empty.';
            break;
        }
        case ErrorCode.KeysetNotFound: {
            message += 'Keyset not found.';
            break;
        }
        case ErrorCode.MissingKey: {
            message += 'Missing key.';
            break;
        }
        case ErrorCode.MissingKeyFor0: {
            message += 'Missing key for 0';
            return message;
        }
        case ErrorCode.MissingKeyParamsCount: {
            message += 'Missing params.count for key.';
            break;
        }
        case ErrorCode.MissingKeyPlurals: {
            message += 'Missing required plurals.';
            break;
        }
        case ErrorCode.NoLanguageData: {
            message = `Language "${lang}" is not defined, make sure you call setLang for the same language you called registerKeysets for!`;
        }
    }
    if (fallbackLang) {
        message += ` Trying to use fallback language "${fallbackLang}"...`;
    }
    return message;
}
export const hasNestingTranslations = (keyValue) => {
    var _a;
    const NESTING_PREGEXP = getNestingTranslationsRegExp();
    const match = NESTING_PREGEXP.exec(keyValue);
    return ((_a = match === null || match === void 0 ? void 0 : match.length) !== null && _a !== void 0 ? _a : 0) > 0;
};
export const getPluralValues = (keyValue) => {
    if (keyValue instanceof Array) {
        return keyValue;
    }
    else if (keyValue instanceof Object) {
        return Object.values(keyValue);
    }
    return [];
};
