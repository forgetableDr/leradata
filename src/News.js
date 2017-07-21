import React, { Component } from 'react'
import Page from './Components/Page'
import PageNav from './Components/PageNav'
import Cards from './Components/Cards'
import './css/home.css'

const getDataFromApi = path => new Promise((resolve, reject) => {
  fetch(path)
  .then(result => result.json())
  .then(json => resolve(json))
  .catch(error => reject(error))
})

class News extends Component {
  constructor() {
    super()
    this.state = {
      cardsArray: []
    }
  }

  componentWillMount() {
    this.props.onActive('News')
    getDataFromApi('https://berlogajs.com/leradata/get?page=news')
    .then(data => this.setState({cardsArray: data.reverse ? data.reverse() : ''}))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <Page cl="news-page">
        <PageNav page="home" />
        <Cards
          sectionCl="home_cards"
          page="news"
          cardsArray={this.state.cardsArray}/>
      </Page>
    )
  }
}




export default News
