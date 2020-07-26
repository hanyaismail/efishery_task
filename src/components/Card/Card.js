import React from 'react';
import './card.scss';

export const Card = ({children}) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}