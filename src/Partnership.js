import React, { Component } from 'react'
import Page from './Components/Page'
import './css/home.css'

class Partnership extends Component {

  componentWillMount() {
    this.props.onActive("Partnership");
  }

  render() {
    return (
      <Page cl="partnership-page">
        <h3>Партнеры</h3>
      </Page>
    );
  }
}




export default Partnership;
