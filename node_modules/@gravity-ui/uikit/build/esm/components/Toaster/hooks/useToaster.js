import * as React from 'react';
import { ToasterContext } from "../Provider/ToasterContext.js";
export function useToaster() {
    const toaster = React.useContext(ToasterContext);
    if (toaster === null) {
        throw new Error('Toaster: `useToaster` hook is used out of context');
    }
    return React.useMemo(() => ({
        add: toaster.add.bind(toaster),
        remove: toaster.remove.bind(toaster),
        removeAll: toaster.removeAll.bind(toaster),
        update: toaster.update.bind(toaster),
        has: toaster.has.bind(toaster),
    }), [toaster]);
}
//# sourceMappingURL=useToaster.js.map
