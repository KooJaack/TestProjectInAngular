import { ItemsLayout } from './../items-list/items-list-layouts';
import { Item } from './item.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item

  @Input('class') itemsLayout: ItemsLayout

  constructor() { }

  ngOnInit(): void {
  }
}
