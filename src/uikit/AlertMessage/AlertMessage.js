import React from 'react';
import './alertmessage.scss';

export const AlertMessage = ({message, type = 'success'}) => {
  return (
    <div className={`alert-message alert-message-${type}`}>
      {message}
    </div>
  )
}