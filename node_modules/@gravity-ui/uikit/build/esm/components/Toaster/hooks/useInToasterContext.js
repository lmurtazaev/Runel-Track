import * as React from 'react';
import { ToasterContext } from "../Provider/ToasterContext.js";
export function useInToasterContext() {
    return React.useContext(ToasterContext) !== null;
}
//# sourceMappingURL=useInToasterContext.js.map
