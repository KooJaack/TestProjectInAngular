export interface Item{
    itemId: number;
    title: string,
    description: string,
    imageUrl: string,
    publicationTime: Date
}

export interface ItemResult {
    items: Array<Item>,
    totalItems: number
}