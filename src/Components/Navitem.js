import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom'
import Ripple from '../img/Ripple.png'

class NavItem extends Component {

  makeRipple(id, name, e) {
    if(this.props.transitionIsGoing === true || name == this.props.activeName) e.preventDefault()
    this.props.onRipple(id);
  }

  render() {
    let navigation = this.props.leraNavigation ? this.props.leraNavigation.map(item => {
      const { name, title, to, id } = item
      const activeName = this.props.activeName;
      const transitionIsGoing = this.props.transitionIsGoing;
      const classn = name === activeName ?
      'lera_header_nav_item lera_header_nav_item-active' :
      'lera_header_nav_item'
      return (
          <NavLink onClick={this.makeRipple.bind(this, id, name)} key={name} to={to}><li className={classn}>{title}<img src={Ripple} className="lera_header_nav_item_ripple" /></li></NavLink>
        )
    }) : '';
    return (
      <nav className="lera_header_part lera_header_nav">
        <ul>
          {navigation}
        </ul>
      </nav>
    )
  }
}

export default NavItem;
