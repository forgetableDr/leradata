import React, { Component } from 'react'

class Page extends Component {
  render() {
    return (
          <div className={'container container-height ' + this.props.cl}>
            {this.props.children}
          </div>
    )
  }
}

export default Page;
