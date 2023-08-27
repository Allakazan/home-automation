import { PlainLiteralObject } from "@nestjs/common";

interface PaginationStats {
    totalRecords: number;
    totalPages: number;
    currentPage: number
}

export interface Pagination {
    data: Array<PlainLiteralObject>;
    pagination: PaginationStats;
}

  