import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;
class App extends Component {
  constructor() {
    super();

    this.state = {
      juices: [],
    };
  }

  componentDidMount() {
    fetch(`${BASE_URL}/juices`)
    .then(res => res.json())
    .then(data => this.setState({
      juices: data,
    })).catch(err => console.log(err));

  }
  render() {
    return (
      <div className="App">
        HENDUE
        {this.state.juices.map(juice => {
          return <p key={juice.id}> Name:{juice.name}, Sugar:{juice.sugar} </p>
        })}
      </div>
    );
  }
}

export default App;
