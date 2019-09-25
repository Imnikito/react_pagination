export const createPrevItem = (currentPage: number) => ({
  text: '\u25C4',
  key: 'prev',
  page: Math.max(1, currentPage - 1),
});

export const createNextItem = (currentPage: number, totalPages: number) => ({
  text: '\u25BA',
  key: 'next',
  page: Math.min(currentPage + 1, totalPages),
});

export const createEllipsisItem = (key: number | string) => ({
  text: '...',
  key,
});

export const pagesFactory = (activePage: number) => (pageNumber: number) => ({
  active: activePage === pageNumber,
  text: pageNumber,
  key: pageNumber,
  page: pageNumber,
});
