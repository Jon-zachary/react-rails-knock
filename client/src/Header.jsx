import React, { Component } from 'react';

const Header = (props) => {
  return (
  <div className='header'>
    <h1 style={{display: 'inline-block'}}> A-HENDUE |</h1>  
    <button onClick={props.logout}>
          Logout
    </button>
  </div>
  )
}

export default Header