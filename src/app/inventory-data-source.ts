import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { PagingResult } from './models/paging-result';
import { finalize, startWith } from 'rxjs/operators';
import { PagingRequest } from './models/paging-request';
import { OrderDirection } from './api/inventory.generated';

export class InventoryDataSource<TModel, TFilter extends PagingRequest> implements DataSource<TModel> {
  displayedColumns: string[] = [];
  pageSizeOptions = [10, 25, 50, 100];
  isLoading = false;

  private paginator: MatPaginator;
  private matSort: MatSort;
  private dataFunc: (filter: TFilter) => Observable<PagingResult<TModel>>;
  private dataSubject = new BehaviorSubject<TModel[]>([]);
  private filter: TFilter;

  connect(collectionViewer: CollectionViewer): Observable<TModel[] | readonly TModel[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  filterData(filter: TFilter = null) {
    this.filter = Object.assign({}, this.filter, filter);
    this.filter.page = 0;
    this.load();
  }

  init(
    paginator: MatPaginator,
    matSort: MatSort,
    displayedColumns: string[],
    dataFunc: (filter: TFilter) => Observable<PagingResult<TModel>>
  ) {
    this.paginator = paginator;
    this.matSort = matSort;
    this.displayedColumns = displayedColumns;
    this.dataFunc = dataFunc;

    merge(this.paginator.page, this.matSort.sortChange).pipe(startWith({}))
      .subscribe(() => {
        this.updateFilter();
        this.load();
    });
  }

  private load() {
    this.isLoading = true;
    this.dataSubject.next([]);
    this.dataFunc(this.filter)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(resp => {
        this.dataSubject.next(resp.results);
        this.paginator.length = resp.totalCount;
        this.paginator.pageIndex = resp.currentPage;
      });
  }

  private updateFilter() {
    this.filter = this.filter || {} as TFilter;
    this.filter.page = this.paginator.pageIndex;
    this.filter.pageSize = this.paginator.pageSize;

    if (this.matSort.direction) {
      if (this.matSort.direction === 'asc') {
        this.filter.orderBy = this.matSort.active;
        this.filter.orderDirection = OrderDirection.Asc;
      } else if (this.matSort.direction === 'desc') {
        this.filter.orderBy = this.matSort.active;
        this.filter.orderDirection = OrderDirection.Desc;
      }
    } else {
      this.filter.orderBy = undefined;
      this.filter.orderDirection = undefined;
    }
  }
}
