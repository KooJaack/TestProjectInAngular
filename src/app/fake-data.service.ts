import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item/item.interface';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  
  private dataSubject = new BehaviorSubject<Array<Item>>([]);
  data = this.dataSubject.asObservable();
  dataLoaded: Array<Item> = [];
  allData:Array<Item> = Array.from({ length: 1000 }, (_, i) => ({title: `item #${i}`, description: "description", imageUrl: "image", date: new Date()}));

  constructor() {
    this.getPageItems(5);
    this.dataSubject.next(this.dataLoaded);
   }

  loadMore(numberOfItems: number): void {
    for (let index = 0; index < 2000000000; index++) {
    }
    if (this.getPageItems(5)) {
      this.dataSubject.next(this.dataLoaded);
    }
  }

  canLoadMore(): boolean {
    return this.allData.length - this.dataLoaded.length > 0;
  }

  private getPageItems(numberOfItems: number): boolean {
    if(this.dataLoaded.length >= this.allData.length){
      return false;
    }
    const remainingLength = Math.min(5, this.allData.length - this.dataLoaded.length);
    this.dataLoaded.push(...this.allData.slice(this.dataLoaded.length, this.dataLoaded.length+remainingLength))
    return true
  }
}
