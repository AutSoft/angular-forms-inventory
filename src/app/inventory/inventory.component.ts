import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { Item, InventoryClient } from '../api/inventory.generated';
import { InventoryDataSource } from '../inventory-data-source';
import { PagingRequest } from '../models/paging-request';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  datasource = new InventoryDataSource<Item, PagingRequest>();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  private displayedColumns = ['id', 'name', 'description', 'count', 'countDate', 'controls'];

  constructor(private inventoryClient: InventoryClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.datasource.init(
      this.paginator,
      this.sort,
      this.displayedColumns,
      (f) => this.inventoryClient.getItems(f.pageSize, f.page, f.orderBy, f.orderDirection)
    );
    this.cdRef.detectChanges();
  }

  delete(id: number) {
    this.inventoryClient.deleteItem(id).subscribe(() => {
      // refresh table data
      this.datasource.filterData();
    });
  }

}
