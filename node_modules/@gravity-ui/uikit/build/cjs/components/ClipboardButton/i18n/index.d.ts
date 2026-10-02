declare const _default: ((key: "startCopy" | "endCopy", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "startCopy" | "endCopy", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "startCopy" | "endCopy", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        ClipboardButton: Record<"startCopy" | "endCopy", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
