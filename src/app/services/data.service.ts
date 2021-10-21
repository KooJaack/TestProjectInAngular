import { IDataService } from '../interfaces/data.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item, ItemResult } from '../interfaces/item.interface';
import {tap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDataService {
  itemsChanges = new Subject<Item[]>();
  items = this.itemsChanges.asObservable();
  itemsList = Array<Item>();
  itemsTotal: number = 0;
  pageNumber: number = 0;

  readonly apiUrl = 'https://localhost:44370/api/items';

  constructor(private http: HttpClient) { 
  }

  loadMore(pageSize: number): Observable<ItemResult> {
    const url = `${this.apiUrl}?offset=${this.pageNumber*pageSize}&limit=${pageSize}`;
    return this.http.get<ItemResult>(url).pipe(
      timeout(10000),
      tap(data => {
        this.itemsList.push(...data.items);
        this.itemsChanges.next(this.itemsList);
        this.itemsTotal = data.totalItems;
        this.pageNumber++;
      })
    );
  }

  clearItemsList(){
    this.itemsList = [];
    this.itemsTotal = 0;
    this.itemsChanges.next(this.itemsList);
    this.pageNumber = 0;
  }

  canLoadMore(): boolean{
    return !(this.itemsList.length >= this.itemsTotal);
  }
}
