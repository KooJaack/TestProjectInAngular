import { FakeDataService } from './../fake-data.service';
import { ItemsLayout } from './items-list-layouts';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item/item.interface';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemListComponent implements OnInit {
  pageSize: number = 5
  layout: ItemsLayout = ItemsLayout.CARDS
  items: Observable<Array<Item>>;
  layoutTypes = Object.values(ItemsLayout)

  constructor(private dataService: FakeDataService){
      this.items = dataService.data;
  }

  ngOnInit(): void {
  }
  onLoadMoreClick(): void{
    this.dataService.loadMore(5);
  }
}
