import * as React from 'react';
export function useAsyncActionHandler({ handler, }) {
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
