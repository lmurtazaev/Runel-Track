import type { DeprecatedPluralValue, PluralValue, Pluralizer } from "../types";
export declare function getPluralViaIntl(value: PluralValue, count: number, lang: string): string | undefined;
type FormatPluralArgs = {
    key: string;
    value: DeprecatedPluralValue | PluralValue;
    fallbackValue?: string;
    count: number;
    lang: string;
    pluralizers?: Record<string, Pluralizer>;
    log: (message: string) => void;
};
export declare function getPluralValue({ value, count, lang, pluralizers, log, key }: FormatPluralArgs): string;
export {};
