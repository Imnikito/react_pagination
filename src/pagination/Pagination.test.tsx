import Pagination from './Pagination';
import { render, fireEvent } from '@testing-library/react';
// import { vi, it, expect } from 'vitest'; // no need with global=true

/**
 * siblingRange - кол-во страниц, показываемых по сторонам от активной.
 * Размер пагинации: текущая страница + 2 * siblingRange + по заглушке(ellipsis) с каждой стороны (или, если не хватает
 * только одной страницы, то ставим ее) + первая и последняя страницы + стрелки.
 *
 * Т.е., при siblingRange == 2, 11 элементов, из них 9 потенциальных позиций для ссылок на страницы.
 * При этом, если кол-во страниц в интервале [1, 9] - просто отрисовать их все подряд, без заглушек "..." + стрелки.
 *
 * Средний случай - показать текущую страницу + с каждой стороны по siblingRange страниц
 * + по заглушке(страницу, если не хватает только одного элемента) + первую и последнюю страницу + стрелки.
 *
 * Если с одной из сторон от активной страницы до границы <= siblingRange + 1(заглушка)
 * (т.е. часть предполагаемых элементов с одной стороны не помещается), то используем оставшиеся позиции для страниц
 * с другой стороны. При этом заглушка только одна.
 */

it('When page item is clicked callback is called with a number of page as an argument', () => {
  const mockCb = vi.fn();
  const { getByText } = render(
    <Pagination
      totalPages={30}
      selectPage={mockCb}
    />,
  );

  const pageItem = getByText('6');
  fireEvent.click(pageItem);

  expect(mockCb).toBeCalledWith(6);
});

it('Arrow buttons switch pages correctly', () => {
  const mockCb = vi.fn();
  const { getByText } = render(
    <Pagination
      totalPages={30}
      selectPage={mockCb}
      currentPage={6}
    />,
  );

  const nextArrow = getByText('►');
  const prevArrow = getByText('◄');

  fireEvent.click(nextArrow);
  fireEvent.click(prevArrow);

  expect(mockCb.mock.calls[0][0]).toBe(7);
  expect(mockCb.mock.calls[1][0]).toBe(5);
});

it.each([[30, 4], [30, 1], [30, 28], [3001, 2997]])
('If elements from one side do not fit only one ellipsis will be added. Number of elements remain the same',
(totalPages: number, currentPage: number): void => {
  const { getAllByText, queryAllByText } = render(
    <Pagination
      totalPages={totalPages}
      selectPage={vi.fn()}
      currentPage={currentPage}
      siblingRange={2}
    />,
  );

  const numPages = getAllByText(/\d+/);
  const ellipsis = queryAllByText('...');

  expect(numPages.length).toBe(8);
  expect(ellipsis.length).toBe(1);
});

it('If there is only 1 page one link and two arrows must be rendered', () => {
  const { getAllByText, queryAllByText } = render(
    <Pagination
      totalPages={1}
      selectPage={vi.fn()}
      currentPage={1}
    />,
  );

  const arrows = queryAllByText(/[►◄]/);
  const pages = getAllByText(/\d+/);

  expect(arrows.length).toBe(2);
  expect(pages.length).toBe(1);
});

it.each([[9, 2], [4, 2], [1, 2], [1, 3], [11, 3], [12, 4], [3, 4], [5, 1]])
('if totalPages <= number of size of pagination (without arrows) then show all pages, without any ellipsis',
(totalPages: number, siblingRange: number): void => {
  const { getAllByText, queryAllByText } = render(
    <Pagination
      totalPages={totalPages}
      selectPage={vi.fn()}
      currentPage={1}
      siblingRange={siblingRange}
    />,
  );

  const pages = getAllByText(/\d+/);
  const arrows = queryAllByText(/[►◄]/);
  const ellipsis = queryAllByText('...');

  expect(pages.length).toBe(totalPages);
  expect(ellipsis.length).toBe(0);
  expect(arrows.length).toBe(2);
});
