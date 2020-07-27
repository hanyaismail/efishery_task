import React from 'react';
import { Button } from '../Button';
import './pagination.scss';

export const Pagination = ({totalPage, currentPage, onPrev, onNext, disabledPrev, disabledNext}) => {
  return (
    <div className="pagination-a">
      <div>Halaman: {currentPage}/{totalPage}</div>
        <Button 
          disabled={disabledPrev || (totalPage === 0) || (currentPage === 1)}
          className="pagination-button"
          onClick={() => onPrev()}
        >
          <span class="material-icons">keyboard_arrow_left</span>
        </Button>
        <Button 
          disabled={disabledNext || (totalPage === 0) || (currentPage === totalPage)}
          className="pagination-button"
          onClick={() => onNext()}
        >
          <span class="material-icons">keyboard_arrow_right</span>
        </Button>
    </div>
  )
}