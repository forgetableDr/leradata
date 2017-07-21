import React, { Component } from 'react'
import './EasySub.css'

const flex = {
  display: 'flex',
  'justifyContent': 'flex-end',
  'flexWrap': 'wrap',
  'alignItems': 'center'
}

const mainStyle = {
  backgroundImage: 'linear-gradient(30deg, #FF9933, #ffa64d)',
  padding: '30px 0',
  boxSizing: 'border-box',
  margin: '10px 0',
  color: '#fff',
  borderRadius: '4px',
  'fontSize': '16px'
}
const flexItem = {
  margin: '0 10px'
}
const flexText = {
  flexGrow: '100'
}
const input = {
  padding: '0 15px',
  height: '27px',
  cursor: 'pointer'
}
const textInput = {
  border: 'none',
  borderRadius: '8px'
}


class EasySub extends Component {
  render() {
    const params = this.props.params
    return (
      <form {...this.props.listeners} style={{...mainStyle, ...flex}}>
        <p style={{...flexItem, ...flexText}}>{params && params.text ? params.text.value : 'Будьте в курсе наших новостей'}</p>
        <input style={{...flexItem, ...input, ...textInput}} type="text" placeholder="Ваш e-mail"/>
        <input className="easySub_button" style={{...flexItem, ...input}} type="submit" value="Подписаться"/>
      </form>
    )
  }
}



export default EasySub
