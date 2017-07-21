import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SecureLink extends Component {
  render() {
    return (
        <Page cl="about-page" key="about-page">
          <h3>404 - страница не найдена</h3>
          <Link to="/">
            <button className="SecureLink_button">Вернуться на главную</button>
          </Link>
        </Page>
    );
  }
}




export default SecureLink;
