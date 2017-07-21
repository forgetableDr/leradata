import React, { Component } from 'react'
import Page from './Components/Page'
import './css/home.css'

class Products extends Component {

  componentWillMount() {
    this.props.onActive("Products");
  }

  componentWillLeave(callback) {
    console.log('yum')
  }

  render() {
    return (
      <Page cl="products-page" >
        <h3>Продукты</h3>
      </Page>
    );
  }
}




export default Products;
