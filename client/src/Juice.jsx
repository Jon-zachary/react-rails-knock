import React, { Component } from 'react';

const Juice = (props) => {
  const juiceStyle = {
    backgroundColor: 'sandybrown',
    margin: ' 0 600px 0 600px',
  }
  return (<div style={juiceStyle}>
          <p> Name: {props.juice.name} </p>
          <p> Sugar: {props.juice.sugar} </p>
          <button style={{'backgroundColor':'lightblue'}} 
          onClick={() => props.delete(props.juice.id)}> Delete </button>
          </div>
          )
} 
export default Juice