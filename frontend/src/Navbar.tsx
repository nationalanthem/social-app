import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button } from '@material-ui/core/'
import { Link, useLocation, useHistory } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import AddBoxIcon from '@material-ui/icons/AddBox'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import PersonIcon from '@material-ui/icons/Person'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',
  },
}))

const Navbar = () => {
  const classes = useStyles()

  const isAuthenticated = !!localStorage.getItem('token')

  const history = useHistory()
  const location = useLocation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = !!anchorEl

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleExitAccount = () => {
    setAnchorEl(null)
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const handleProfileClick = () => {
    setAnchorEl(null)
    history.push('/profile')
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {isAuthenticated ? (
            location.pathname !== '/feed' ? (
              <IconButton component={Link} to="/feed">
                <HomeOutlinedIcon />
              </IconButton>
            ) : (
              <HomeIcon />
            )
          ) : (
            <HomeOutlinedIcon />
          )}

          {isAuthenticated ? (
            <>
              {location.pathname !== '/create' ? (
                <IconButton component={Link} to="/create">
                  <AddBoxOutlinedIcon />
                </IconButton>
              ) : (
                <AddBoxIcon />
              )}

              <IconButton onClick={handleMenu} color="inherit">
                {location.pathname !== '/profile' ? <PersonOutlineOutlinedIcon /> : <PersonIcon />}
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Мой профиль</MenuItem>
                <MenuItem onClick={handleExitAccount}>Выйти из аккаунта</MenuItem>
              </Menu>
            </>
          ) : (
            <div>
              {location.pathname !== '/login' && (
                <Button component={Link} to="/login">
                  Вход
                </Button>
              )}
              {location.pathname !== '/register' && (
                <Button component={Link} to="/register">
                  Регистрация
                </Button>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
