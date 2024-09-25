import React from 'react';
import PaginationItem from './PaginationItem';
import createPagination from './createPagination';
import styles from './Pagination.module.scss';

interface IProps {
  totalPages: number;
  currentPage?: number;
  siblingRange?: number;
  selectPage: (p: number) => void;
}

const Pagination: React.FC<IProps> = ({
  totalPages,
  selectPage,
  currentPage = 1,
  siblingRange = 2,
}) => (
  <div className={styles.pagination}>
    {createPagination(siblingRange, currentPage, totalPages).map(({key, ...props}) => (
        <PaginationItem
          key={key}
          {...props}
          onClick={selectPage}
        />
      ),
    )}
  </div>
);

export default Pagination;
