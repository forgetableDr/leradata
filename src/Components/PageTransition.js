import React, { Component } from 'react'
import { CSSTransitionGroup, TransitionGroup  } from 'react-transition-group'

class PageTransition extends Component {



  render() {
    return (
      <TransitionGroup>
        <CSSTransitionGroup
          component="div"
          transitionName="PageTransition"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}>
          {this.props.children}
        </CSSTransitionGroup>
      </TransitionGroup>
    );
  }
}




export default PageTransition;
