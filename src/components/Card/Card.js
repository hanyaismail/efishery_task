import React from 'react';
import './card.scss';

export const Card = ({children, title, actions}) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}