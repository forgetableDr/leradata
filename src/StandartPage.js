import React, { Component, ReactDOM } from 'react'
import { Redirect } from 'react-router-dom'
import Page from './Components/Page'
import Cards from './Components/Cards'
import PaginationNew from './Components/Pagination'
import Pagination from "react-js-pagination"
import './css/home.css'

const getDataFromApi = path => new Promise((resolve, reject) => {
  fetch(path)
  .then(result => result.json())
  .then(json => resolve(json))
  .catch(error => reject(error))
})

class StandartPage extends Component {
  constructor() {
    super()
    this.state = {
      cardsArray: [],
      negativePage: false,
      _mounted: false
    }
  }

  componentWillMount() {
    this.setState({
      _mounted: true
    })
    const page = this.props.page
    this.page = page
    const pageNum = parseInt(this.props.pageNum) || 1
    this.pageNum = pageNum
    if(pageNum < 1) this.setState({
      negativePage: true
    })
    this.props.onActive(page.capitalize(), {
      page, pageNum
    })
    let cache = localStorage.getItem(`page${page}${pageNum}`)
    if(!cache) {
      cache = JSON.parse(cache)
      this.setState({
        cardsArray: cache
      })
    }
    getDataFromApi(
      `https://berlogajs.com/leradata/get?page=${this.props.page}&pageNum=${pageNum}`
    )
    .then(data => {
      if(data.error == -1 && this.state._mounted) {
        this.setState({
          negativePage: true
        })
      }
      else {
        const items = data.items
        if(!items || !items.length) return data.amount && pageNum !== 1 ? this.setState({
          needToRedirect: parseInt(data.amount / 10 + 1)
        }) : ''
        const json = JSON.stringify(items)
        localStorage.setItem(`page${page}${pageNum}`, json)
        if(this.state._mounted) this.setState({
          cardsArray: items ? items : '',
          itemsAmount: data.amount
        })
      }
    })
    .catch(error => console.log(error))
  }
  componentWillUnmount() {
    this.setState({
      _mounted: false
    })
  }
  handlePageChange(num) {
    if(num === this.pageNum) return
    this.setState({
      needToRedirect: num
    })
  }
  componentDidMount() {
    let { page, pageNum } = this.props
    pageNum = pageNum || 1
    const cachedScroll = localStorage.getItem(`pageScroll${page}${pageNum}`) || 0
    window.scroll(0, cachedScroll)
    for(let item in localStorage) {
      if(item.startsWith('pageScroll'))
      localStorage.removeItem(item)
    }
  }
  render() {
    const needToRedirect = this.state.needToRedirect
    return (
      <Page cl="news-page">
        {
          this.state.negativePage ?
          <Redirect to={`/${this.page}`} /> :
          <Cards
            sectionCl="home_cards"
            page={this.page}
            cardsArray={this.state.cardsArray}
          />
        }
        {
          this.state.itemsAmount > 10 ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.itemsAmount || 10}
            activePage={this.pageNum}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          /> : ''
        }
        {
          needToRedirect ?
          <Redirect to={`/${this.page}/page/${needToRedirect}`} /> : ''
        }
      </Page>
    )
  }
}




export default StandartPage
