import React from 'react';
import { Button } from '../../uikit/Button';
import './pricelistheader.scss';

export const PriceListHeader = ({onAdd, onSearch, onReset}) => {
  return (
    <div className="price-list-header">
      <div className="list-title">Daftar Komoditas</div>
      <div className="list-action">
        <Button onClick={onAdd}>
          <span class="material-icons">add</span>
        </Button>
        <Button onClick={onSearch}>
          <span class="material-icons">search</span>
        </Button>
        <Button onClick={onReset}>
          <span class="material-icons">refresh</span>
        </Button>
      </div>
    </div>
  )
}