declare const _default: ((key: "label_clear" | "label_show-error-info" | "label_filter", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_clear" | "label_show-error-info" | "label_filter", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_clear" | "label_show-error-info" | "label_filter", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        Select: Record<"label_clear" | "label_show-error-info" | "label_filter", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
