import React from 'react';
import './modal.scss';

export const Modal = ({children, title, onClose}) => {
  return (
    <div className="modal">
      <div className="modal-content-a">
        <div className="modal-header-a">
          <div className="modal-title-a">{title}</div>
          <div className="close-button" onClick={onClose}>&times;</div>
        </div>
        <div style={{borderTop: "1px solid #ccc", margin: '1rem -1.5rem'}}></div>
        <div className="form">
          {children}
        </div>
      </div>
    </div>
  )
}