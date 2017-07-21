import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Page from './Components/Page'

class Admin extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }
  componentWillMount() {
    this.props.onActive("Admin");
    fetch('https://berlogajs.com/leradata/verifylogin/', {
      credentials: 'same-origin',
      method: 'post'
    })
    .then(result => result.json())
    .then(json => json.error ? '' : this.setState({redirect: true}))
  }

  submitLogin(e) {
    e.preventDefault()
    const login = this.refs.login.value
    const password = this.refs.password.value
    fetch('https://berlogajs.com/leradata/login/', {
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({login, password})
    })
    .then(response => response.json())
    .then(json => {
      if(json.error) return console.log(json.errorname);
      else this.setState({redirect: true})
    })
  }

  render() {
    return (
      <Page cl="about-page" key="about-page">
        {this.state.redirect ? <Redirect to="/admin/panel" /> : ''}
        <h3>Вы уверены, что вам можно сюда?</h3>
        <form onSubmit={this.submitLogin.bind(this)} className="admin_form">
          <input ref="login" type="text" className="admin_form_input" placeholder="логин"/>
          <input ref="password" type="text" className="admin_form_input" placeholder="пароль"/>
          <button className="admin_form_button">Вход</button>
        </form>
      </Page>
    );
  }
}




export default Admin;
