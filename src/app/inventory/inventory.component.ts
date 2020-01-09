import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { Item } from '../models/item';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'description', 'count', 'countDate', 'controls'];
  data: Item[] = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getItems().subscribe(result => this.data = result.results);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(console.log);
    this.sort.sortChange.subscribe(console.log);
  }

}
