import React from 'react';
import styles from './Pagination.module.scss';

interface IProps {
  text: string | number;
  active?: boolean;
  onClick: (p: number) => void;
  page?: number | null;
}

const PaginationItem: React.FC<IProps> = ({
  text,
  onClick,
  active = false,
  page = null,
}) => (
  <div
    className={active ? styles.active : styles.item}
    onClick={() => page && onClick(page)}
  >
    {text}
  </div>
);

export default PaginationItem;
