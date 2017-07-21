import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'


class PageNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: this.props.page || 'otherPage'
    }
  }
  render() {
    return (
      <section className={`page_nav ${this.props.className}`}>
        {this.state.page === 'home' ?
         <img src={logo} alt="LERADATA" className="page_nav_logo"/> :
         <Link to="/"><img src={logo} alt="LERADATA" className="page_nav_logo"/></Link>}
        <div className="page_nav_inner">
          <div className="page_nav_left"></div>
          <div className="page_nav_stroke"></div>
          <div className="page_nav_right"></div>
        </div>
      </section>
    )
  }

}
export default PageNav
