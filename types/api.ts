export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginatedResponse<T> {
  info: ApiInfo;
  results: T[];
}
