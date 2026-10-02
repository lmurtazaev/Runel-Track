"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncActionHandler = useAsyncActionHandler;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useAsyncActionHandler({ handler, }) {
    const [isLoading, setLoading] = React.useState(false);
    const handleAction = React.useCallback(async (...args) => {
        setLoading(true);
        try {
            return await handler(...args);
        }
        finally {
            setLoading(false);
        }
    }, [handler]);
    return {
        isLoading,
        handler: handleAction,
    };
}
//# sourceMappingURL=useAsyncActionHandler.js.map
