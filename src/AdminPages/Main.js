import React, { Component } from 'react'
import Page from './Components/Page'
import { Link } from 'react-router-dom'

class Main extends Component {
  componentWillMount() {
    this.props.onActive("Nopage");
  }

  render() {
    return (
        <Page cl="about-page" key="about-page">
          <h3>Страница администрации</h3>
        </Page>
    );
  }
}




export default Main;
