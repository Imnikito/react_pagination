import React, { useState } from 'react';
import Pagination from './pagination';
import styles from './Demo.module.scss';

const Demo: React.FC = () => {
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(30)
  const [siblingRange, setSiblingRange] = useState(2)

  return (
    <div className={styles.demo}>
      <div className={styles.controls}>
          <label htmlFor="total-pages">Total pages:</label>
          <input 
            id="total-pages" 
            type="number" 
            step="1" 
            min="1" 
            value={totalPages} 
            onChange={e => setTotalPages(+e.target.value)}
          />
          <label htmlFor="siblings">Siblings count:</label>
          <input 
            id="siblings" 
            type="number" 
            step="1" 
            min="0" 
            value={siblingRange} 
            onChange={e => setSiblingRange(+e.target.value)}
          />
      </div>
      <Pagination
        totalPages={totalPages}
        selectPage={setActivePage}
        currentPage={activePage}
        siblingRange={siblingRange}
      />
    </div>
  );
  
}

export default Demo;
