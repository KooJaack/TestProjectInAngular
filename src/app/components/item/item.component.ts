import { ItemsLayout } from '../items-list/items-list-layouts';
import { Item } from '../../interfaces/item.interface';
import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-item',
  animations: [
    trigger('ItemsTrigger', [
      transition(':enter', [
        style({opacity: 0 }),  // initial
        animate('200ms', 
          style({opacity: 1 }))  // final
      ])
    ]),
  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item

  @Input('class') itemsLayout: ItemsLayout

  constructor() { 
  }

  ngOnInit(): void {
  }
}
