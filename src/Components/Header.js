import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Navitem from './Navitem'
import uuid from 'uuid'

import searchImage from '../img/Search.png'
import enterImage from '../img/Enter.png'
import phoneImage from '../img/Telephone.png'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leraNavigation: []
    }
  }

  onRipple(id) {
    this.state.leraNavigation.map(item => {
      if(item.id === id) item.active = true
      else item.active = false
    })
  }

  handleLink(e) {
    this.state.transitionIsGoing === true ? e.preventDefault() : ''
  }

  getNavItems() {
    this.setState({
      leraNavigation: [
        {
          name: 'BecomeClient',
          title: 'Стать Клиентом',
          to: '/becomeclient',
          id: uuid.v4(),
          active: false
        },
        {
          name: 'Products',
          title: 'Продукты',
          to: '/products',
          id: uuid.v4(),
          active: false
        },
        {
          name: 'Prices',
          title: 'Тарифы',
          to: '/prices',
          id: uuid.v4(),
          active: false
        },
        {
          name: 'News',
          title: 'Новости',
          to: '/news',
          id: uuid.v4(),
          active: false
        },
        {
          name: 'Partnership',
          title: 'Партнеры',
          to: '/partnership',
          id: uuid.v4(),
          active: false
        },
        {
          name: 'Consult',
          title: 'Получить консультацию',
          to: '/consult',
          id: uuid.v4(),
          active: false
        },
      ]
    })
  }

  componentWillMount() {
    this.getNavItems()
    this.setState({
      transitionIsGoing: this.props.transitionIsGoing
    })
  }

  render() {
    return (
      <div className="lera_header-wrapper">
        <div className="lera_header-holder">
          <header className="lera_header">
            <div className="lera_header_part lera_header_enter">
              <img src={enterImage} alt="" className="lera_header_enter_image"/>
              <a target="_blank" href="https://leradata.pro">
                Вход в систему
              </a>
            </div>
            <Navitem onRipple={this.onRipple.bind(this)}
              handleLink={this.props.handleLink}
               leraNavigation={this.state.leraNavigation} transitionIsGoing={this.props.transitionIsGoing} activeName={this.props.active}/>
               <div className="lera_header_part lera_header_left">
                 <div className="lera_header_search">
                   <img src={searchImage} alt="" className="lera_header_contacts_image"/>
                   <input className="lera_header_input-search" />
                 </div>
                 <div className="lera_header_contacts">
                   <img src={phoneImage} alt="" className="lera_header_contacts_image"/>
                   <a href="tel:(88005559626)" className="lera_header_contact">
                     8 (800) 555 96 26
                   </a>
                   <a href="tel:(84956696812)" className="lera_header_contact">
                     8 (495) 669 68 12
                   </a>
                 </div>
               </div>
          </header>
          <div className="lera_header-decor"></div>
        </div>
        <div className="lera_header-compensate"></div>
      </div>
    )
  }
}




export default Header
