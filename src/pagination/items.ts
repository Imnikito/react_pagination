export interface  IPageItem {
  text: string,
  key: number | string,
  page?: number,
  active?: boolean,
}

export interface ICreatePageItem {
  (n: number): IPageItem,
}

export const createPrevItem = (currentPage: number): IPageItem => ({
  text: '\u25C4',
  key: 'prev',
  page: Math.max(1, currentPage - 1),
});

export const createNextItem = (currentPage: number, totalPages: number): IPageItem => ({
  text: '\u25BA',
  key: 'next',
  page: Math.min(currentPage + 1, totalPages),
});

export const createEllipsisItem = (key: number | string): IPageItem => ({
  text: '...',
  key,
});

export const pagesFactory = (activePage: number): ICreatePageItem => pageNumber => ({
  active: activePage === pageNumber,
  text: String(pageNumber),
  key: pageNumber,
  page: pageNumber,
});
