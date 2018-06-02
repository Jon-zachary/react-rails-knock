import React from 'react';

const Header = (props) => {
  return (
  <div className='header'>
    <button onClick={props.showRegisterForm}> Register</button>
    <h1 style={{display: 'inline-block'}}>| A-HENDUE |</h1>  
    <button onClick={props.logout}> Logout </button>
  </div>
  )
}

export default Header