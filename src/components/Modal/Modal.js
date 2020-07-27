import React from 'react';
import './modal.scss';

export const Modal = ({children, title, onClose}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title-a">{title}</div>
          <div className="close-button" onClick={onClose}>&times;</div>
        </div>
        <div className="form">
          {children}
        </div>
      </div>
    </div>
  )
}