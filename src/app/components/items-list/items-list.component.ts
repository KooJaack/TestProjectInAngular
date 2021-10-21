import { DataService } from '../../services/data.service';
import { GetItemsLayout, ItemsLayout } from './items-list-layouts';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemListComponent implements OnInit {
  allItemsLayout = ItemsLayout;
  layout: ItemsLayout = ItemsLayout.CARDS
  items: Observable<Item[]>;
  layoutTypes = Object.values(ItemsLayout)
  pageSize: number = 15;
  loadMoreButtonVisible: boolean = false;

  constructor(private dataService: DataService, 
    private loadingIndicator: NgxUiLoaderService){
      this.items = dataService.items;
      let tempPageSize: string =  sessionStorage.getItem('pageSize');
      let tempItemsLayout: string = sessionStorage.getItem('itemsLayout');
      this.layout = GetItemsLayout(tempItemsLayout) ?? ItemsLayout.CARDS;
      this.pageSize = tempPageSize !== null ? parseInt(tempPageSize) : 15;
      this.onLoadMoreClick(); 
  }

  ngOnInit(): void {

  }

  changeItemsLayout(){
    sessionStorage.setItem('itemsLayout', this.layout)
    this.dataService.clearItemsList();
    this.onLoadMoreClick();
  }

  changePageSize(){
    sessionStorage.setItem('pageSize', this.pageSize.toString())
    location.reload();
  }

  async onLoadMoreClick() {
    this.loadMoreButtonVisible = false;
    this.loadingIndicator.startBackground();
    this.dataService.loadMore(this.pageSize).subscribe(
      value => {
        console.log('HTTP Next', value)
    },
      err => {
        console.log('HTTP Error', err),
        this.loadingIndicator.stopBackground();
      },
      () => {
        this.loadingIndicator.stopBackground();
        this.loadMoreButtonVisible = this.dataService.canLoadMore();
        console.log('HTTP request completed.');
      }
    );
  }
}
