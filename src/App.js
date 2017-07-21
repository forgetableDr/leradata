import React, { Component } from 'react'
import './App.css'
import './Header.css'
import { TransitionGroup } from 'react-transition-group'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { RouteTransition } from 'react-router-transition'
import ScrollToTopRoute from './Components/ScrollToTopRoute'
import PageNav from './Components/PageNav'
import PageTransition from './Components/PageTransition'
import Header from './Components/Header'
import Home from './Home'
import About from './About'
import BecomeClient from './BecomeClient'
import Products from './Products'
import Prices from './Prices'
import News from './News'
import Partnership from './Partnership'
import Consult from './Consult'
import Admin from './Admin'
import AdminPages from './AdminPages'
import Article from './Components/Article'
import Nopage from './Nopage'
import StandartPage from './StandartPage'

const pages = {
  Home,
  About,
  BecomeClient,
  Products,
  Prices,
  News,
  Partnership,
  Consult,
  Admin,
  AdminPages,
  Article,
  Nopage,
  StandartPage
}

const allPages = {
  Home: {

  },
  About: {

  },
  Becomeclient: {

  },
  Products: {

  },
  Prices: {

  },
  News: {

  },
  Partnership: {

  },
  Consult: {

  },
  Admin: {

  },
  Adminpages: {

  },
  Article: {

  },
  Nopage: {

  },
  StandartPage: {

  },

}

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, l => l.toUpperCase())
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: '',
      transitionIsGoing: false,
      logged: false
    }
  }

  getTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(parsed => {
      this.setState({todos: parsed}, function() {
      })
    })
    //.catch(error => console.log(error))
  }
  verifyLogin() {

  }


  onActive(name, referrer) {
    this.setState({
      transitionIsGoing: true,
      navigation: name,
      referrer
    })
    setTimeout(() => {
      this.setState({
        transitionIsGoing: false
      })
    }, 300)
  }

  handleLink(e) {
    e.preventDefault()
  }

  componentDidMount() {
    //this.getTodos()
  }

  componentWillMount() {
    this.verifyLogin()
  }
  render() {
    return (
      <Router>
        <Route render={({ location }) => (
          <div className="App">
            <Header active={this.state.navigation} transitionIsGoing={this.state.transitionIsGoing}
              handleLink = {this.handleLink.bind(this)}
            />
            <PageNav className="container" page="home" />
            <PageTransition>
              <Switch key={location.key} location={location}>
                <Route location={location} key={location.key} exact path="/" render={props => (
                  <Home  onActive={this.onActive.bind(this)} />
                )} />

                <Route location={location} key={location.key} exact path="/admin" render = {props => (
                  <Admin onActive={this.onActive.bind(this)} />
                )} />
                <Route location={location} key={location.key} path="/admin/panel/:page" render = {({match}) => (
                  !this.state.logged ? <AdminPages page={match.params.page} onActive={this.onActive.bind(this)} /> : <Redirect to="/admin" />
                )} />
                <Route location={location} key={location.key} path="/articles/:page/:id" render = {({match}) => {
                  return <Article onActive={this.onActive.bind(this)} params={{...match.params}} referrer={this.state.referrer} />
                }} />
                <Route location={location} key={location.key} path="/:page/page/:num" render= {({match}) => {

                  const { page, num } = match.params
                  const capPage = page.capitalize()
                  if(allPages[capPage]) {
                    return <StandartPage onActive={this.onActive.bind(this)} pageNum={num} page={page} />
                  }
                  else return <Nopage onActive={this.onActive.bind(this)} />
                }}/>
                <Route location={location} key={location.key} path='/:page' render = {({match}) => {
                  const { page } = match.params
                  const capPage = page.capitalize()
                  const num = 1
                  if(allPages[capPage]) {
                    return <StandartPage onActive={this.onActive.bind(this)} pageNum={num} page={page} />
                  }
                  else return <Nopage onActive={this.onActive.bind(this)} />
                }} />
                <Route location={location} key={location.key} render = {props => (
                  <Nopage onActive={this.onActive.bind(this)} />
                )} />
              </Switch>
            </PageTransition>
            <footer className="lera_footer">
            </footer>
          </div>
        )}/>
      </Router>
    )
  }
}

export default App
/*
<AddProject addProject={this.handleAddProject.bind(this)}/>
<Projects onDelete={this.deleteProject.bind(this)} projects={this.state.projects}/>
<hr />
<Todos todos={this.state.todos}/>
*/

/*
<Route exact path="/becomeclient" render = {(props, location) => (
<BecomeClient {...props} onActive={this.onActive.bind(this)} />
)} />
<Route exact path="/products" render = {(props, location) => (
<Products {...props} onActive={this.onActive.bind(this)} />
)} />


*/
/*
<PageTransition>
<Route location={location} key={location.key} exact path="/" render={props => (
<Home  onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/becomeclient" render = {props => (
<BecomeClient  onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/products" render = {props => (
<Products onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/prices" render = {props => (
<Prices onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/consult" render = {props => (
<Consult onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/partnership" render = {props => (
<Partnership onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/news" render = {props => (
<News onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
<PageTransition>
<Route location={location} key={location.key} exact path="/about" render = {props => (
<About onActive={this.onActive.bind(this)} />
)} />
</PageTransition>
*/
