export class PagingResult<T> {
  results: T[];
  currentPage: number;
  totalCount: number;
}
