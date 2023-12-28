export type Page<T> = {
  content: T[];
  page: number;
  limit: number;
  totalRecords: number;
  totalFiltered: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
};

export class Pagination {
  protected _page = 1;
  protected _limit = 10;
  protected _total: number;
  protected _totalFiltered: number;
  private maxTakes = 100;

  constructor(
    page?: number,
    limit?: number,
    total?: number,
    totalFiltered?: number,
  ) {
    this._page = page || this._page;
    this._limit = limit || this._limit;
    this._total = total || 0;
    this._totalFiltered = totalFiltered || 0;
  }

  set page(value: number) {
    this._page = Math.max(value, 1);
  }

  get page(): number {
    return this._page;
  }

  set limit(value: number) {
    this._limit = value <= this.maxTakes ? value : this.maxTakes;
  }

  get limit(): number {
    return this._limit;
  }

  get total(): number {
    return this._total;
  }

  set totalFiltered(total: number) {
    this._totalFiltered = total;
  }

  get totalFiltered(): number {
    return this._totalFiltered;
  }

  protected hasNextPage(): boolean {
    return this.page * this.limit < this.total;
  }

  protected hasPreviousPage(): boolean {
    return this.page > 1;
  }

  protected nextPage(): number {
    return this.page + 1;
  }

  protected previousPage(): number {
    return this.page > 0 ? this.page - 1 : 0;
  }

  public buildPage<T>(content: T[]): Page<T> {
    return {
      page: this.page,
      limit: this.limit,
      totalRecords: this.total,
      totalFiltered: this.totalFiltered,
      totalPages: Math.ceil(this.totalFiltered / this.limit) || 0,
      hasNextPage: this.hasNextPage(),
      hasPreviousPage: this.hasPreviousPage(),
      nextPage: this.nextPage(),
      previousPage: this.previousPage(),
      content,
    };
  }

  public filterProps() {
    return {
      skip: (this.page - 1) * this.limit,
      take: this.limit,
    };
  }
}
