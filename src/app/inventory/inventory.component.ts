import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'description', 'count', 'controls'];
  data = [
    { id: 1, name: 'name', description: 'description', count: 3},
    { id: 2, name: 'name', description: 'description', count: 4},
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(console.log);
    this.sort.sortChange.subscribe(console.log);
  }

}
