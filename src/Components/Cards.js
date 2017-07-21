import React, { Component } from 'react';
import Ripple from '../img/Ripple.png'
import { Link } from 'react-router-dom'
import Card from './Card'
import uuid from 'uuid'

class Cards extends Component {

  render() {
    const { controls, cardsArray, type, sectionCl } = this.props // type can be double(for card that takes all space) and single(for standart card)
    const cardsToRender = cardsArray && cardsArray.map ?
    cardsArray.map(item => <Card
      handleClose={this.props.handleClose}
      handleDone={this.props.handleDone}
      handleEdit={this.props.handleEdit}
      controls={controls} key={uuid.v4()}
      type={type}
      page={this.props.page}
      params={item} />) : ''
      return (
        <section className={`cards ${sectionCl}`}>
          {cardsToRender}
        </section>
      )
    }

  }
  export default Cards;
