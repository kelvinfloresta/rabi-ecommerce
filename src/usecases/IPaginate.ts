export interface IPaginationParams {
  perPage: number;
  currentPage: number;
}
export interface IPagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
}

export interface IWithPagination<T> {
  data: T[];
  pagination: IPagination;
}
