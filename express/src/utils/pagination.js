"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationLimit = exports.paginationOffset = exports.pagination = exports.PER_PAGE = void 0;
exports.PER_PAGE = 5;
function pagination({ total, page }) {
    const lastPage = (page * exports.PER_PAGE) >= total;
    return {
        page: Number(page),
        per_page: exports.PER_PAGE,
        pages: Math.ceil(total / exports.PER_PAGE),
        total,
        last_page: lastPage
    };
}
exports.pagination = pagination;
function paginationOffset(page) {
    return page === 1 ? 0 : (page * exports.PER_PAGE) - exports.PER_PAGE;
}
exports.paginationOffset = paginationOffset;
function paginationLimit() {
    return exports.PER_PAGE;
}
exports.paginationLimit = paginationLimit;
//# sourceMappingURL=pagination.js.map