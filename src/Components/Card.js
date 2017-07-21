import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom'

class Card extends Component {
  handleDone() {
    this.props.handleDone(this.props.params.id)
  }
  handleEdit() {
    this.props.handleEdit(this.props.params.id)
  }
  handleClose() {
    this.props.handleClose(this.props.params.id)
  }
  render() {
    const type = this.props.type || 'single'
    const item = this.props.params
    const route = item.route
    return (
      <div >
        <div className={
          `card
          card-${type}
          ${item.status ? '' : 'card-disabled'}`
        }>
        {
          this.props.controls ?
          <div className="card-controls">
            <div onClick={this.handleDone.bind(this)} className="card_controls_item card_controls-done">

            </div>
            <div onClick={this.handleEdit.bind(this)} className="card_controls_item card_controls-edit">

            </div>
            <div onClick={this.handleClose.bind(this)} className="card_controls_item card_controls-close"></div>
          </div>
          : ''
        }

        <Link
          to={route ? route : `/articles/${this.props.page}/${item.id}`}
          className="card_inner">
          <h3 className="card_heading">
            {item.headingtext}
          </h3>
          <div className="card_additional">
            {item.additionaltext}
          </div>
        </Link>
      </div>
    </div>
  )
}
}

export default Card
