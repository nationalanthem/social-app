import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import PostCreationPage from './pages/PostCreationPage'
import FeedPage from './pages/FeedPage'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {localStorage.getItem('token') ? <Redirect to="/feed" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/create" component={PostCreationPage} />
        <Route path="/feed" component={FeedPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
