import React from 'react';
import { TopBar } from '../TopBar';
import './layout.scss';

export const Layout = ({children}) => {
  return (
    <div className="layout">
      <TopBar />
      <div className="main">
        {children}
      </div>
    </div>
  )
}