import React, { Component } from 'react'
import Page from './Components/Page'
import Cards from './Components/Cards'
import PageNav from './Components/PageNav'
import './css/home.css'

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardsArray: []
    }
  }

  componentWillMount() {
    this.setState({
      cardsArray: [
        {
          headingtext: 'Новости',
          additionaltext: 'самые свежие',
          route: '/news',
          status: 1
        },
        {
          headingtext: 'Партнёры',
          additionaltext: 'наши',
          route: '/partnership',
          status: 1
        },
        {
          headingtext: 'Познакомьтесь с LERADATA',
          additionaltext: 'мы классные',
          route: '/news',
          status: 1
        },
        {
          headingtext: 'Продукты и услуги',
          additionaltext: 'самые лучшие',
          route: '/products',
          status: 1
        },
      ]
    })
    this.props.onActive('Home')
  }

  render() {
    return (
      <Page key="Home" cl="home-page">
        <section className="home_header">
          <div className="home_header_controls">
          </div>
        </section>
        <Cards sectionCl="home_cards" cardsArray={this.state.cardsArray}/>
      </Page>
    )
  }
}




export default Projects
