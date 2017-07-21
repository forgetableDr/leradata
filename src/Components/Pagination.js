import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Pagination.css'

const outerStyle = {
  height: '50px',
}
const innerStyle = {
  height: '100%',
  width: '605px',
  margin: '0 auto',
  display: 'flex',
}

class PaginationItem extends Component{
  render() {
    return (
      <div className="leradata_pagination_item">
        <Link className="leradata_pagination_link" to={this.props.to}>
          {this.props.text}
        </Link>
      </div>
    )
  }
}

class Pagination extends Component {
  constructor() {
    super()
    this.state = {
      page: 'news',
      pageNum: 1,
      totalPages: 10
    }
  }

  componentWillMount() {

  }

  render() {
    const getPaginationItems = () => {
      const { page, pageNum, totalPages } = this.state
      const output = []
      if(pageNum === 1) {
        output.push(
          <PaginationItem key="0" to="/" text="1" />
        )
      }
      else {
        output.push(
          <PaginationItem key="0" to="/" text={pageNum - 1}/>
        )
      }
      for(let i = 1; i < 10; i++) {
        const num = pageNum + i
        if(num > totalPages) break
        output.push(
          <PaginationItem key={i} to="/" text={num} />
        )
      }
      return output
    }
    return (
      <div style={outerStyle}>
        <div style={innerStyle}>
          {getPaginationItems()}
        </div>
      </div>
    )
  }
}




export default Pagination
