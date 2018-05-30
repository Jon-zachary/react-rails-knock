import React, { Component } from 'react';
import './App.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor() {
    super();

    this.state = {
      juices: [],
      email: '',
      password:'',
      token: '',
      isLoggedIn: null,
    };
    this.getJuices = this.getJuices.bind(this)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
    return res;
  }

  getJuices() {
    console.log('getting juices');
    const jwt = localStorage.getItem("jwt")
    const init = { 
      headers: {"Authorization": `Bearer ${jwt}`}
    }
    fetch(`${BASE_URL}/juices`, init)
    .then(res => res.json())
    .then(data => this.setState({
      juices: data,
    }))
    .then(console.log(this.state.juices))
    .catch(err => err)
    console.log(this.isLoggedIn())
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
     isLoggedIn: false,
     juices: [],
    })
  }

  login() {
    const url = `${BASE_URL}/user_token`;
    const body = {"auth": {"email": this.state.email, "password": this.state.password} }
    const init = { method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                   mode: 'cors',
                   body:JSON.stringify(body),
                   }
    fetch(url, init)
    .then(res => res.json())
    .then(res => localStorage.setItem("jwt", res.jwt))
    .then(() => this.setState({
      isLoggedIn: true,
    }))
    .then(() => this.getJuices())
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getJuices()
  }

  render() {
    const display = this.state.isLoggedIn ? this.state.juices.map(juice => {
          return <p key={juice.id}> Name:{juice.name}, Sugar:{juice.sugar} </p>
        }) : "UNAUTHORIZED"
    return (
      <div className="App">
        A-HENDUE
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            onChange={this.handleChange}
            value={this.state.value}
            type="password"
          />
          </form>
          <br />

          <button onClick={this.login}>
          Login
          </button>

          <button onClick={this.logout}>
          Logout
          </button>

          <button onClick={this.getJuices}>
          Get Juices
          </button>

          <div> {display} </div>
      </div>
    );
  }
}

export default App;
