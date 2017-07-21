import React, { Component } from 'react'
import Page from './Components/Page'
import './css/home.css'

class Prices extends Component {

  componentWillMount() {
    this.props.onActive("Prices");
  }

  render() {
    return (
      <Page cl="prices-page">
        <h3>Тарифы</h3>
      </Page>
    );
  }
}




export default Prices;
