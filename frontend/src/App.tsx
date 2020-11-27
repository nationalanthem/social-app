import React from 'react'
import Navbar from './components/Navbar'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
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
import FollowingsPage from './pages/FollowingsPage'
import { Typography, Box } from '@material-ui/core'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = !!localStorage.getItem('token')

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser())
    }
  }, [isAuthenticated, dispatch])

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/feed" /> : <Redirect to="/login" />}
        </Route>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/followings"
          component={FollowingsPage}
        />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/profile" component={MyProfile} />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/settings"
          component={SettingsPage}
        />
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
          <Box textAlign="center">
            <Typography>К сожалению, такой страницы не существует :(</Typography>
            <Typography component={Link} to="/" color="primary">
              Вернуться домой
            </Typography>
          </Box>
        </Route>
      </Switch>
    </>
  )
}

export default App
