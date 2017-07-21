import React, { Component } from 'react'
import Page from './Components/Page'

class About extends Component {
  componentWillMount() {
    this.props.onActive("About");
  }

  render() {
    return (
        <Page cl="about-page" key="about-page">
          <h3>О нас</h3>
        </Page>
    );
  }
}




export default About;
