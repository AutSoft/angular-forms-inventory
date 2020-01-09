import { Injectable } from '@angular/core';
import { PagingResult } from '../models/paging-result';
import { Item } from '../models/item';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private httpClient: HttpClient) { }

  getItems(pageSize: number = 10, page: number = 0): Observable<PagingResult<Item>> {
    return this.httpClient.get<PagingResult<Item>>('/api/inventory', {
      params: new HttpParams()
        .append('pageSize', pageSize.toString())
        .append('page', page.toString())
    }).pipe(map(result => {
      result.results = result.results.map(i => plainToClass(Item, i));
      return result;
    }));
  }
}
