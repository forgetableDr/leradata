import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Ripple from '../img/Ripple.png'
import Page from './Page'
import Card from './Card'
import uuidv4 from 'uuid'
import EasySub from './EasySub'



const getDataFromApi = path => new Promise((resolve, reject) => {
  fetch(path)
  .then(result => result.json())
  .then(json => resolve(json))
  .catch(error => reject(error))
})

class ArticleItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item, listeners } = this.props
    const params = item.params
    if(!item) return
    if(item.html) {
      return <div dangerouslySetInnerHTML={JSON.parse(item.html)}/>
    }
    else if(item.type){
      const component = this.props.components[item.type]
      const OurComp = component.comp
      return(
        <OurComp listeners={component.listeners} params={params}/>
      )
    }

  }
}

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: []
    }
    this.components = {
      EasySub: {
        comp: EasySub,
        listeners: {
          onSubmit: this.easySubHandler.bind(this)
        }
      }
    }
  }
  componentWillMount() {
    const params = this.props.params
    const referrer = this.props.referrer
    const page = referrer ? referrer.page || params.page : params.page
    const pageNum = referrer ? referrer.pageNum || 1 : 1
    localStorage.setItem(`pageScroll${page}${pageNum}`, window.scrollY)

    this.props.onActive(params.page.charAt(0).toUpperCase() + params.page.slice(1))
    getDataFromApi(`https://berlogajs.com/leradata/getarticle?page=${params.page}&id=${params.id}`)
    .then(data => {
      const { id, headingText, additionalText } = data
      try{
        this.setState({
          article: JSON.parse(data.article),
          id,
          headingText,
          additionalText
        })
      }
      catch(e) {e}
    })
    .catch(error => console.log(error))
  }

  easySubHandler(e) {
    e.preventDefault()
    console.log(this.state.id)
  }
  componentDidMount() {
    window.scroll(0, 0)
  }
  render() {
    const listeners = {
      easySubHandler: this.easySubHandler,
    }
    const article = this.state.article ? this.state.article.map(item => {
      return (
        <ArticleItem
          key={uuidv4()}
          item={item}
          {...listeners}
          components={this.components}
        />
      )
    }) : []
    return (
      <Page>
        {article}
      </Page>
    )
  }
}
export default Article
