import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyProfile from './pages/MyProfile'
import PostCreationPage from './pages/PostCreationPage'
import FeedPage from './pages/FeedPage'
import { ProtectedRoute } from './ProtectedRoute'
import { useDispatch } from 'react-redux'
import { fetchUser } from './redux/re-ducks/user/effects'
import SinglePostPage from './pages/SinglePostPage'
import UserProfile from './pages/UserProfile'

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser())
    }
  }, [isAuthenticated, dispatch])

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/feed" /> : <Redirect to="/login" />}
        </Route>
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/profile" component={MyProfile} />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/u/:userID"
          component={UserProfile}
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/create"
          component={PostCreationPage}
        />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/feed" component={FeedPage} />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/p/:postID"
          component={SinglePostPage}
        />

        <Route path="/login">{isAuthenticated ? <Redirect to="/feed" /> : <LoginPage />}</Route>
        <Route path="/register">
          {isAuthenticated ? <Redirect to="/feed" /> : <RegisterPage />}
        </Route>

        <Route path="*">
          <div style={{ textAlign: 'center' }}>
            <h2>К сожалению, такой страницы не существует :(</h2>
            <Link to="/">Вернуться домой</Link>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
