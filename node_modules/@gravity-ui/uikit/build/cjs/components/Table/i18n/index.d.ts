declare const _default: ((key: "label_empty" | "label-actions" | "label-row-select", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_empty" | "label-actions" | "label-row-select", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_empty" | "label-actions" | "label-row-select", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        Table: Record<"label_empty" | "label-actions" | "label-row-select", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
