import type { SelectOptions, SelectProps } from "../../types.js";
export interface UseSelectOptionsProps<T = any> {
    /** [Select options](https://gravity-ui.com/components/uikit/select#options). */
    options: SelectOptions<T>;
    /** Value to filter options. Used with `filterable: true` only. */
    filter?: string;
    /** Indicates that `filter` and `filterOption` properties can be used. */
    filterable?: boolean;
    /** Used to compare option with filter. Used with `filterable: true` only. */
    filterOption?: SelectProps['filterOption'];
}
/**
 * Helps to manage options data before passing it into `Select` component.
 * @param {SelectOptions} options
 * @returns preprared options for `Select` component.
 * @example
 *
 * import {Select, getSelectFilteredOptions, useSelectOptions} from '@gravity-ui/uikit';
 *
 * function App() {
 *   const options = useSelectOptions({options: [{value: '1'}, {value: '2'}]});
 *   const filteredOptions = getSelectFilteredOptions(options);
 *   // Do some staff with prepared options
 *   return <Select options={options} />
 * }
 */
export declare function getSelectFilteredOptions<T>(options: SelectOptions<T>): SelectOptions<T>;
export declare function useSelectOptions<T extends any>(props: UseSelectOptionsProps<T>): SelectOptions<T>;
