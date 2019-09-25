import {
  pagesFactory,
  createEllipsisItem,
  createPrevItem,
  createNextItem,
} from './items';

export default function createPagination(siblingRange: number, currentPage: number, totalPages: number) {
  const firstPage = 1;
  const createPageItem = pagesFactory(currentPage);

  const range = isSimplePagination(siblingRange, totalPages)
    ? createSimpleRange(firstPage, totalPages, createPageItem)
    : createComplexRange(siblingRange, currentPage, totalPages, createPageItem);

  return [
    createPrevItem(currentPage),
    ...range,
    createNextItem(currentPage, totalPages),
  ];
}

function createSimpleRange(start: number, end: number, createPageItem: (i: number) => any ) {
  return Array(end - start + 1).fill(undefined).map((_, i) => createPageItem(i + start));
}

function createComplexRange(
    siblingRange: number,
    currentPage: number,
    totalPages: number,
    createPageItem: (i: number) => any,
  ) {
  const ellipsis = 1;
  const firstGroupEnd = 1;

  const innerGroupStart = Math.min(
    Math.max(currentPage - siblingRange, firstGroupEnd + 1 + ellipsis),
    Math.max(totalPages - 2 * siblingRange - 1 - ellipsis, firstGroupEnd + 1 + ellipsis),
  );
  const innerGroupEnd = innerGroupStart + 2 * siblingRange;

  const innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, createPageItem);

  return [
    createPageItem(firstGroupEnd),
    leftGap(firstGroupEnd, innerGroupStart, createPageItem),
    ...innerGroup,
    rightGap(innerGroupEnd, totalPages, createPageItem),
    createPageItem(totalPages),
  ];
}

// "Simple" means it can be created by enumeration only
function isSimplePagination(siblingRange: number, totalPages: number) {
  const ellipsisSize = 2;
  const boundarySize = 2;  // first and last pages
  const siblingRangeSize = siblingRange * 2;
  return totalPages <= 1 + ellipsisSize + siblingRangeSize + boundarySize;
}

function leftGap(start: number, end: number, createPageItem: (i: number) => any) {
  const showEllipsis = end - start > 2;
  return showEllipsis ? createEllipsisItem(start + 1) : createPageItem(end - 1);
}

function rightGap(start: number, end: number, createPageItem: (i: number) => any) {
  const showEllipsis = end - start > 2;
  return showEllipsis ? createEllipsisItem(end - 1) : createPageItem(end - 1);
}
