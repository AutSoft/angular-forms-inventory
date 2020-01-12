import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { Item, InventoryClient } from '../api/inventory.generated';

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

  constructor(private inventoryClient: InventoryClient) {}

  ngOnInit() {
    this.inventoryClient.getItems().subscribe(result => this.data = result.results);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(console.log);
    this.sort.sortChange.subscribe(console.log);
  }

  delete(id: number) {
    this.inventoryClient.deleteItem(id).subscribe(() => {
      // refresh table data
      this.inventoryClient.getItems().subscribe(result => this.data = result.results);
    });
  }

}
