import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import PostCreationPage from './pages/PostCreationPage'
import FeedPage from './pages/FeedPage'
import { ProtectedRoute } from './ProtectedRoute'
import { userAPI } from './api/user.api'
import { IUserContext, UserContext } from './context/UserContext'

const App = () => {
  const authToken = localStorage.getItem('token')
  const [user, setUser] = React.useState<IUserContext | null>(null)

  React.useEffect(() => {
    if (authToken) {
      userAPI
        .myProfile()
        .then((res) => {
          setUser(res.data.data)
        })
        .catch((err) => {
          alert('Ошибка при загрузке данных')
          console.log(err.response)
        })
    }
  }, [authToken])

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Navbar authToken={authToken} />
        <Switch>
          <Route exact path="/">
            {!!authToken ? <Redirect to="/feed" /> : <Redirect to="/login" />}
          </Route>
          <ProtectedRoute isAuthenticated={!!authToken} path="/profile" component={ProfilePage} />
          <ProtectedRoute
            isAuthenticated={!!authToken}
            path="/create"
            component={PostCreationPage}
          />
          <ProtectedRoute isAuthenticated={!!authToken} path="/feed" component={FeedPage} />

          <Route path="/login">{!!authToken ? <Redirect to="/feed" /> : <LoginPage />}</Route>
          <Route path="/register">{!!authToken ? <Redirect to="/feed" /> : <RegisterPage />}</Route>

          <Route path="*">
            <div style={{ textAlign: 'center' }}>
              <h2>К сожалению, такой страницы не существует :(</h2>
              <Link to="/">Вернуться домой</Link>
            </div>
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
