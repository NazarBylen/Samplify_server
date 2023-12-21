export const PER_PAGE  = 5;

export function pagination({ total, page }) {

  const lastPage = (page * PER_PAGE) >= total;

  return {
    page: Number(page),
    per_page: PER_PAGE,
    pages: Math.ceil(total/PER_PAGE),
    total,
    last_page: lastPage
  };
}
export function paginationOffset(page) {
  return page === 1 ? 0 : (page * PER_PAGE) - PER_PAGE;
}

export function paginationLimit() {
  return PER_PAGE;
}
