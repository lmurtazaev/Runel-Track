declare const _default: ((key: "label_increment" | "label_decrement", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label_increment" | "label_decrement", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label_increment" | "label_decrement", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        NumberInput: Record<"label_increment" | "label_decrement", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
