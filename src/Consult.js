import React, { Component } from 'react'
import Page from './Components/Page'
import './css/home.css'


class Consult extends Component {

  componentWillMount() {
    this.props.onActive("Consult");
  }

  render() {
    return (
      <Page cl="consult-page">
        <h3>Консультация</h3>
      </Page>
    );
  }
}




export default Consult;
