declare const _default: ((key: "label", params?: import("@gravity-ui/i18n").Params) => string) & {
    Translation: import("react").ComponentType<{
        children: (props: {
            t: (key: "label", params?: import("@gravity-ui/i18n").Params) => string;
        }) => React.ReactNode;
    }>;
    useTranslation: () => {
        t: (key: "label", params?: import("@gravity-ui/i18n").Params) => string;
    };
    keysetData: {
        Accordion: Record<"label", import("@gravity-ui/i18n").KeyData>;
    };
};
export default _default;
