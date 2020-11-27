import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Tooltip } from '@material-ui/core/'
import { Link, useLocation, useHistory } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import AddBoxIcon from '@material-ui/icons/AddBox'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import PersonIcon from '@material-ui/icons/Person'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(5),
  },
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

  const handleSettingsClick = () => {
    setAnchorEl(null)
    history.push('/settings')
  }

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        {isAuthenticated ? (
          location.pathname !== '/feed' ? (
            <Tooltip title="Домой">
              <IconButton component={Link} to="/feed">
                <HomeOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <HomeIcon />
          )
        ) : (
          <HomeOutlinedIcon />
        )}

        {isAuthenticated ? (
          <>
            {location.pathname !== '/create' ? (
              <Tooltip title="Создать пост">
                <IconButton component={Link} to="/create">
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <AddBoxIcon />
            )}

            {location.pathname !== '/followings' ? (
              <Tooltip title="Подписки">
                <IconButton component={Link} to="/followings">
                  <StarBorderIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <StarIcon />
            )}

            <Tooltip title="Аккаунт">
              <IconButton onClick={handleMenu}>
                {location.pathname !== '/profile' && location.pathname !== '/settings' ? (
                  <PersonOutlineOutlinedIcon />
                ) : (
                  <PersonIcon />
                )}
              </IconButton>
            </Tooltip>

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
              <MenuItem onClick={handleSettingsClick}>Настройки</MenuItem>
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
  )
}

export default Navbar
