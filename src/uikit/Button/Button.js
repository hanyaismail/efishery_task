import React from 'react';
import './button.scss';

export const Button = ({disabled, children, onClick}) => {
  return (
    <button className="button-a" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}