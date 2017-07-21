import React, { Component } from 'react'
import Page from './Components/Page'
import { Link } from 'react-router-dom'

class Nopage extends Component {
  componentWillMount() {
    this.props.onActive("Nopage");
  }

  render() {
    return (
        <Page cl="about-page" key="about-page">
          <h3>404 - страница не найдена</h3>
          <Link to="/">
            <button className="nopage_button">Вернуться на главную</button>
          </Link>
        </Page>
    );
  }
}




export default Nopage;
