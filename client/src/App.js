import React, { Component } from 'react';
import './App.css';
import Juice from './components/Juice';
import Login from './components/Login';
import Header from './components/Header';
import JuiceForm from './components/JuiceForm';
const BASE_URL = process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor() {
    super();

    this.state = {
      juices: [],
      email: '',
      password:'',
      isLoggedIn: null,
      name: '',
      sugar:'',
      isEdit:false,
      selectedJuiceId:null,
    };
    this.getJuices = this.getJuices.bind(this)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.delete = this.delete.bind(this)
    this.submitNew = this.submitNew.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.showEditForm = this.showEditForm.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  cancel() {
    this.setState({
      name:'',
      sugar:'',
      isEdit:false,
      selectedJuiceId:null,
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

  showEditForm(id) {
    const juice = this.state.juices.filter(juice => juice.id === id);
    this.setState({
      name: juice[0].name,
      sugar: juice[0].sugar,
      isEdit: true,
      selectedJuiceId: juice[0].id
    })
  }

  submitEdit(id) {
    const jwt = localStorage.getItem("jwt")
    const body = {"juice": {"name": this.state.name, "sugar": this.state.sugar} }
    const init = {
      headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(body)
    }
    fetch(`${BASE_URL}/juices/${id}`, init)
    .then(() => this.getJuices())
    .then(this.setState({
      name:'',
      sugar:'',
      isEdit:false,
      selectedJuiceId:null,
    }))
    .catch(err => err.message)

  }

  submitNew() {
    const jwt = localStorage.getItem("jwt")
    const body = {"juice": {"name": this.state.name, "sugar": this.state.sugar} }
    const init = {
      headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body)
    }
    fetch(`${BASE_URL}/juices`, init)
    .then(() => this.getJuices())
    .catch(err => err.message)
  }

  delete(id) {
    const jwt = localStorage.getItem("jwt")
    const init = { 
      headers: {"Authorization": `Bearer ${jwt}`},
      method: 'DELETE',
      mode: 'cors',
    }
    fetch(`${BASE_URL}/juices/${id}`, init)
    .then(()=> this.getJuices())
    .catch(err => err.message)
  }

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
    return res;
  }

  getJuices() {
    const jwt = localStorage.getItem("jwt")
    const init = { 
      headers: {"Authorization": `Bearer ${jwt}`}
    }
    fetch(`${BASE_URL}/juices`, init)
    .then(res => res.json())
    .then(data => this.setState({
      juices: data,
    }))
    .catch(err => err)
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

  

  componentDidMount() {
    this.isLoggedIn()
    this.getJuices()
  }

  render() {
    const display = this.state.isLoggedIn ? this.state.juices.map(juice => {
          return (<Juice 
          key={juice.id} 
          juice={juice} 
          delete={this.delete} 
          edit={this.submitEdit}
          showEditForm={this.showEditForm}
          />)
        }) : <Login handleChange={this.handleChange}
                 login={this.login}
                 logout={this.logout}
                 getJuices={this.getJuices}
                 email={this.state.email}
                 password={this.state.password}
                 />
    return (
      <div className="App">
        <Header logout={this.logout} create={this.create} />
        <div> {display} </div>
        <JuiceForm 
        handleChange={this.handleChange} 
        submitNew={this.submitNew} 
        name={this.state.name}
        sugar={this.state.sugar}
        isEdit={this.state.isEdit}
        id={this.state.selectedJuiceId}
        submitEdit={this.submitEdit}
        cancel={this.cancel}
        />
      </div>
    );
  }
}

export default App;
