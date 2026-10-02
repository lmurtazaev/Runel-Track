import { KeyData } from "./types";
export declare enum ErrorCode {
    EmptyKeyset = "EMPTY_KEYSET",
    EmptyLanguageData = "EMPTY_LANGUAGE_DATA",
    KeysetNotFound = "KEYSET_NOT_FOUND",
    MissingKey = "MISSING_KEY",
    MissingKeyFor0 = "MISSING_KEY_FOR_0",
    MissingKeyParamsCount = "MISSING_KEY_PARAMS_COUNT",
    MissingKeyPlurals = "MISSING_KEY_PLURALS",
    MissingInheritedKey = "MISSING_INHERITED_KEY",
    NestedPlural = "NESTED_PLURAL",
    ExceedTranslationNestingDepth = "EXCEED_TRANSLATION_NESTING_DEPTH",
    NoLanguageData = "NO_LANGUAGE_DATA"
}
declare const codeValues: ErrorCode[];
export type ErrorCodeType = (typeof codeValues)[number];
export declare function mapErrorCodeToMessage(args: {
    code: ErrorCodeType;
    lang: string;
    fallbackLang?: string;
}): string;
export declare const hasNestingTranslations: (keyValue: string) => boolean;
export declare const getPluralValues: (keyValue: KeyData) => string[];
export {};
