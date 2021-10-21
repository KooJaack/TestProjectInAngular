export enum ItemsLayout {
    CARDS = "cards",
    POSTS = "posts"
}

export function GetItemsLayout(enumValue: string): ItemsLayout {
    for(let layout in ItemsLayout){
        if (ItemsLayout[layout] === enumValue)
            return ItemsLayout[layout];
    }
        return null;
}