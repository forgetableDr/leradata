import React, { Component } from 'react'
import Page from './Components/Page'
import { Link } from 'react-router-dom'

class AdminPage extends Component {
  componentWillMount() {
    this.props.onActive("Nopage");
  }

  render() {
    console.log(this.props.page)
    return (
        <Page cl="about-page" key="about-page">
          <h3>Страница администрации</h3>
          <Link to="/admin/panel/news">
            <button className="button-std button">Новости</button>
          </Link>
          <Link to="/admin/panel/products">
            <button className="button-std button">Продукты</button>
          </Link>
          <Link to="/admin/panel/reviews">
            <button className="button-std button">Отзывы</button>
          </Link>
          <Link to="/admin/panel/partnership">
            <button className="button-std button">Партнёры</button>
          </Link>
          <Link to="/admin/panel/prices">
            <button className="button-std button">Тарифы</button>
          </Link>
        </Page>
    );
  }
}




export default AdminPage;
