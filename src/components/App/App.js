import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Places from '../Place/Places'
import CreateReview from '../Review/CreateReview'
import Reviews from '../Review/Reviews'
import EditReview from '../Review/EditReview'
import Home from '../Place/Home'
import CreateItem from '../Place/CreateItem'
import Place from '../Place/Place'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/places' render={(props) => (<Places {...props} alert={this.alert} user={user}/>)} />
          <AuthenticatedRoute user={user} exact path='/' render={(props) => (<Home {...props} alert={this.alert} user={user}/>)} />
          <AuthenticatedRoute user={user} exact path='/items/:id' render={(props) => (<Reviews {...props} alert={this.alert} user={user}/>)} />
          <AuthenticatedRoute user={user} exact path='/items/:id/reviews' render={(props) => (<CreateReview {...props} alert={this.alert} user={user}/>)} />
          <AuthenticatedRoute user={user} exact path='/items/:id/reviews/:rid' render={(props) => (<EditReview alert={this.alert} {...props} user={user}/>)} />
          <AuthenticatedRoute user={user} exact path='/places/:id/items' render={(props) => (<CreateItem alert={this.alert} {...props} user={user}/>)} />
          <AuthenticatedRoute user={user} exact path='/places/:id' render={(props) => (<Place {...props} alert={this.alert} user={user}/>)} />

        </main>
      </Fragment>
    )
  }
}

export default App
