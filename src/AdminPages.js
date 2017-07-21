import React, { Component } from 'react'
import Page from './Components/Page'
import { Link, Switch } from 'react-router-dom'
import Cards from './Components/Cards'
import './css/admin.css'
import { Editor as Editorr } from 'react-draft-wysiwyg'
import './react-draft-wysiwyg.css'
import Editor from './Components/Editor'
import TinyMCE from 'react-tinymce'



const getDataFromApi = path => new Promise((resolve, reject) => {
  fetch(path)
  .then(result => result.json())
  .then(json => resolve(json))
  .catch(error => reject(error))
})

class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: true,
      currentPage: '',
      type: '',
      data: '',
      cardsArray: [],
      loading: false,
      editproject: false,
    }
  }
  componentWillMount() {
    this.props.onActive('Nopage')
  }
  getItems(page) {
    this.setState({
      currentPage: page
    })
    getDataFromApi(`https://berlogajs.com/leradata/admin/get?page=${page}`)
    .then(data => this.setState({cardsArray: data.reverse ? data.reverse() : ''}))
    .catch(error => console.log(error))
  }
  addHandler() {
    this.setState({
      articleText: '<p>Текст статьи</p>',
      editproject: true
    })
  }
  handleClose(id) {
    const page = this.state.currentPage
    const data = JSON.stringify({page, id})
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://berlogajs.com/leradata/admin/delete', true)
    xhr.send(data)
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return
      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText)
      } else {
        let cardsArray = JSON.parse(xhr.responseText)
        cardsArray = cardsArray.reverse ? cardsArray.reverse() : ''
        this.setState({
          cardsArray,
          currentPage: page
        })
      }
    }
  }
  handleDone(id) {
    const page = this.state.currentPage
    const data = JSON.stringify({page, id})
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://berlogajs.com/leradata/admin/toggle', true)
    xhr.send(data)
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return
      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText)
      } else {
        let cardsArray = JSON.parse(xhr.responseText)
        cardsArray = cardsArray.reverse ? cardsArray.reverse() : ''
        this.setState({
          cardsArray,
          currentPage: page
        })
      }
    }
  }
  handleEdit(id) {
    const page = this.state.currentPage
    const data = JSON.stringify({page, id})
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://berlogajs.com/leradata/admin/change', true)
    xhr.send(data)
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return
      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText)
      } else {
        let cardsArray = JSON.parse(xhr.responseText)
        cardsArray = cardsArray.reverse ? cardsArray.reverse() : ''
        this.setState({
          cardsArray,
          currentPage: page
        })
      }
    }
  }
  submitProject(article) {
    const refs = this.refs
    let { headingtext, additionaltext } = refs
    headingtext = headingtext.value
    additionaltext = additionaltext.value
    const page = this.state.currentPage
    const data = JSON.stringify({
      page: page,
      headingtext: headingtext,
      additionaltext:additionaltext,
      article: article ? article : ''
    })
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://berlogajs.com/leradata/admin/add', true)
    xhr.send(data)
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return
      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText)
      } else {
        let cardsArray = JSON.parse(xhr.responseText)
        console.log(cardsArray)
        cardsArray = cardsArray.reverse ? cardsArray.reverse() : ''
        this.setState({
          cardsArray,
          currentPage: page,
          loading: false,
          editproject: false,
        })
      }
    }
  }
  render() {
    return (
      this.state.logged ? <Page cl="admin-page" key="admin-page">
      {!this.state.editproject ?
        <div className="admin-page_inner">
          <div className="admin-page_controls">
            <h3>Страница администрации</h3>
            <button onClick={() => this.getItems('news')} className="button-std button">
              Новости
            </button>
            <button onClick={() => this.getItems('products')} className="button-std button">
              Продукты</button>
              <button onClick={() => this.getItems('reviews')} className="button-std button">
                Отзывы
              </button>
              <button onClick={() => this.getItems('partnership')} className="button-std button">
                Партнёры
              </button>
              <button onClick={() => this.getItems('prices')} className="button-std button">
                Тарифы
              </button>
              <h3>{this.state.currentPage}</h3>
              {this.state.currentPage && this.state.cardsArray ? <button className="button-std" onClick={this.addHandler.bind(this)}>Добавить в {this.state.currentPage}</button> : ''}
              <Cards
                handleClose={this.handleClose.bind(this)}
                handleEdit={this.handleEdit.bind(this)}
                handleDone={this.handleDone.bind(this)}
                controls={true}
                sectionCl="home_cards"
                cardsArray={this.state.cardsArray}/>
              </div>
            </div> :
            <div className="admin-page_editor">
              <label htmlFor="heading">
                Заголовок: <input ref="headingtext" name="heading" type="text"/>
              </label><br/><br/>
              <label htmlFor="heading">
                Дополнительный текст: <input ref="additionaltext" name="heading" type="text"/>
              </label>
              <h3>Текст:</h3>
              <Editor handleSubmit={this.submitProject.bind(this)} />
            </div>
          }
        </Page> : <Page>
      </Page>

    )
  }
}




export default AdminPage

/*
getDataFromApi('https://berlogajs.com/leradata/admin/add', params)
.then(result => console.log(result))
.catch(error => console.log(error))
*/
