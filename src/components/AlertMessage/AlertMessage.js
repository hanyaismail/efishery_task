import React from 'react';
import './alertmessage.scss';

export const AlertMessage = ({message, type}) => {
  return (
    <div className="alert-message">{message}</div>
  )
}