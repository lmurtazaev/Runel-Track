export declare function toItemList<Item extends {
    hidden?: boolean;
    items?: (Item | Item[])[];
}, ListItem extends {
    items?: ListItem[];
    path: number[];
}>(items: (Item | Item[])[], separator: ListItem, path?: number[], startIndex?: number): ListItem[];
