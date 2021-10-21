import { Observable } from "rxjs";
import { ItemResult } from "./item.interface";

export interface IDataService {
    loadMore(pageSize: number): Observable<ItemResult>,
    clearItemsList(),
    canLoadMore(): boolean;
}