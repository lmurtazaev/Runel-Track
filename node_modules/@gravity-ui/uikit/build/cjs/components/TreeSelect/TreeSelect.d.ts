import * as React from 'react';
import type { TreeSelectProps } from "./types.js";
import "./TreeSelect.css";
export declare const TreeSelect: <T, P extends {} = {}>(props: TreeSelectProps<T, P> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;
