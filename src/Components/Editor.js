import React, { Component } from 'react'
import './Editor.css'
import { Editor as Editorr } from 'react-draft-wysiwyg'
import '../react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js'
import uuidv4 from 'uuid/v4'

import EasySub from './EasySub'

const components = {
  EasySub
}

class Button extends Component {
  buttonClicked() {
    this.props.buttonClicked(this.props.option)
  }
  render() {
    const option = this.props.option
    return (
      <div
        onClick={this.buttonClicked.bind(this)}
        className="f-button">
        {option.name}
      </div>
    )
  }
}

class Wysiwyg extends Component{
  constructor(props) {
    super(props)
    this.state = {
      shouldUsePrerendered: false,
      editorState: ''
    }
  }
  componentWillMount() {
    if(this.props.storedState) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(this.props.storedState))
      })
      this.props.removeStoredEditor(this.props.edible.key)
    }
  }
  uploadImage() {
    return new Promise((resolve, reject) => {
      resolve('https://s-media-cache-ak0.pinimg.com/originals/28/1e/d7/281ed7f8bb7768eb468446b502592ec0.jpg')
    })
  }
  onEditorStateChange(editorState) {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    this.props.changeHtml(markup, this.props.edible.key, editorState)
  }
  render() {
    const es = this.props.edible.editorState
    const cs = this.props.edible.contentState
    const editorState = es ? es : this.state.editorState
    const contentState = cs
    return <Editorr
      contentState={contentState}
      editorState={editorState}
      onEditorStateChange={this.onEditorStateChange.bind(this)}
      toolbar={{ image: { uploadCallback: this.uploadImage }}}
     />
  }
}

class ArticleItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const item = this.props.item
    const params = item.params
    if(!item) return
    const listeners = {
      onClick: () => this.props.handleEdit(item.key),
      draggable: true,
      onDrag: e => this.props.handleDragStart(e, item.key),
      onDragOver: e => e.preventDefault(),
      onDrop: e => this.props.handleDrop(e, item.key)
    }
    if(item.html) {
      return <div {...listeners} dangerouslySetInnerHTML={item.html}/>
    }
    else if(item.type){
      const OurComp = components[item.type]
      return(
        <OurComp listeners={listeners} params={params}/>
      )
    }

  }
}

class EditForm extends Component {
  handleChange(e, key) {
    this.props.handleChange(e, key)
  }
  handleRemove() {
    const key = this.props.edible ? this.props.edible.key: ''
    if(! key) return
    this.props.handleRemove(key)
  }
  render() {
    let i = 0
    const edible = this.props.edible
    //console.log(edible.params ? Object.values(edible.params) : '')
    const params = edible.params
    const controls = params ? Object.values(params).map(param => (
      <param.type
        value={param.value}
        key = {++i}
        onChange={e => this.props.handleChange(e, this.props.edible.key, param.name)}
      />
      )
    ) : ''
    return (
      <div>
        <div className="f-elemeditor_exit" onClick={this.handleRemove.bind(this)}>

        </div>
        {
          controls ? (<form>{controls}</form>) : (edible.edit ? <Wysiwyg key={edible.key} edible={edible} changeHtml={this.props.changeHtml} removeStoredEditor={this.props.removeStoredEditor}/> : '')
        }
      </div>
    )
  }
}

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options:{
        div: {
          name: 'div',
          edit: 'wysiwyg',
          html: {__html: '<p>Привет</p>'},
          editorState: '',
          haveText: true
        },
        EasySub: {
          name: 'ES',
          type: 'EasySub',
          params: {
            text: {name: 'text', type: 'input', value: 'Будьте в курсе наших новостей'}
          }
        },
        h2: {
          name: 'h2',
          params: {
            text: {name: 'text', type: 'input', value: 'Заголовок'}
          }
        },
        h3: {
          name: 'h3',
          params: {
            text: {name: 'text', type: 'input', value: 'Заголовок'}
          }
        },
        h4: {
          name: 'h4',
          params: {
            text: {name: 'text', type: 'input', value: 'Заголовок'}
          }
        },
        a: {
          name: 'a',
          params: {
            text: {name: 'text', type: 'input', value: 'Заголовок'},
            href: {name: 'href', type: 'input', value: '#'}
          },
          props: {href: 'href'}
        },

      },
      optionsArr: [],
      article: [
      ],
      editing: false,
      currentEdible: {},
      currentIndex: 0
    }
  }
  handleChange(e, key, name) {
    name = name || 'text'
    const value = e.target.value
    const article = this.state.article
    const index = article.findIndex(item => item.key === key)
    article[index].params[name].value = value
    this.setState({article})
  }
  handleRemove(key) {
    let article = this.state.article
    const index = article.findIndex(item => item.key === key)
    article.splice(index, 1)
    this.setState({
      article,
      currentEdible: {},
      currentIndex: article.length
    })
  }
  handleEdit(key) {
    const article = this.state.article
    this.setState({
      currentEdible: article[article.findIndex(item => item.key === key)]
    })
  }
  handleDragStart(e, key) {
    e.preventDefault()
    e.dataTransfer.setData('draggedKey', key)
  }
  handleDrop(e, key) {
    e.preventDefault()
    const draggedKey = e.dataTransfer.setData('draggedKey', key)
    const article = this.state.article
    const dragged = article.splice(article.findIndex(item => item.key === draggedKey), 1)
    article.splice(article.findIndex(item => item.key === key), 0, dragged[0])
    this.setState({article})
  }
  elementChange(item) {
    this.setState({
      currentEdible: item
    })
  }
  changeHtml(html, key, editorState) {
    const article = this.state.article
    const index = article.findIndex(item => item.key === key)
    article[index].html = {__html: html}
    article[index].editorState = editorState
    this.setState({article})
  }
  createElement(options) {
    const key = uuidv4()
    const article = this.state.article
    options = {...options}
    options.params = options.params ? {...options.params} : undefined
    options.html = options.html ? {...options.html} : undefined
    //options.params = options.params ? options.params.map(item => item = {...item}) : undefined
    article.splice(this.state.currentIndex, 0, {...options, key})
    this.setState({
      article,
      currentIndex: article.length
    })
  }
  removeStoredEditor(key) {
    const article = this.state.article
    const index = article.findIndex(item => item.key === key)
    //article[index].params[name].value = value
    //this.setState({article})
  }
  handleSubmit() {
    const article = this.state.article
    const articleToSend = article.map(item => {
      if(!item.edit) return item
      const newItem = item
      newItem.contentState = JSON.stringify(convertToRaw(item.editorState.getCurrentContent()))
      newItem.editorState = ''
      newItem.html = JSON.stringify(item.html)
      return newItem
    })
    this.props.handleSubmit(articleToSend)
  }
  componentWillMount() {
    this.setState({
      optionsArr: Object.values(this.state.options)
    })
  }
  render() {
    const options = this.state.optionsArr ? this.state.optionsArr.map(option => (
      <Button buttonClicked={this.createElement.bind(this)} key={uuidv4()} option={option}/>
    )) : ''
    const article = this.state.article ? this.state.article.map(item => {

      return (
        <ArticleItem
          key={item.key}
          item={item}
          handleEdit={this.handleEdit.bind(this)}
          draggable
          handleDragStart={this.handleDragStart.bind(this)}
          handleDrop={this.handleDrop.bind(this)}
        />
      )
    }) : ''
    return (
      <div className="f-editor_whole">
        <div className='f-editor_outer'>
          <div className="f-editor">
            <div className="f-buttons">
              {options}
            </div>
            <div className="f-editor_article">
              {article}
            </div>
          </div>
          <div className='f-elemeditor'>
            <EditForm article={this.state.article} changeHtml={this.changeHtml.bind(this)} handleRemove={this.handleRemove.bind(this)} handleChange={this.handleChange.bind(this)} edible={this.state.currentEdible} removeStoredEditor={this.removeStoredEditor.bind(this)}/>
          </div>
        </div>
        <button onClick={this.handleSubmit.bind(this)} className="button-std">Отправить</button>
      </div>

    )
  }

}



export default Editor
