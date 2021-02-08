import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Tooltip } from '@material-ui/core/'
import { Link, useLocation, useHistory } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import PageviewIcon from '@material-ui/icons/Pageview'
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined'
import AddBoxIcon from '@material-ui/icons/AddBox'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import PersonIcon from '@material-ui/icons/Person'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'

import { NavbarButton } from './NavbarButton'

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(5),
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  iconBox: {
    boxSizing: 'border-box',
    padding: '12px',
    width: 48,
    height: 48,
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const [authState, setAuthState] = React.useState<boolean | null>(null)
  const isAuthenticated = !!localStorage.getItem('token')

  React.useEffect(() => {
    if (isAuthenticated && !authState) {
      setAuthState(isAuthenticated)
    }

    if (!isAuthenticated && authState) {
      window.location.href = '/login'
    }
  }, [isAuthenticated, authState])

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

  const handleNavbarButtonClick = (pushTo: string) => () => {
    setAnchorEl(null)
    history.push(pushTo)
  }

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        {isAuthenticated ? (
          <NavbarButton
            path="/feed"
            iconButton={<HomeOutlinedIcon />}
            icon={<HomeIcon />}
            title="Домой"
          />
        ) : (
          <div className={classes.iconBox}>
            <HomeOutlinedIcon />
          </div>
        )}

        {isAuthenticated ? (
          <>
            <NavbarButton
              path="/users"
              iconButton={<PageviewOutlinedIcon />}
              icon={<PageviewIcon />}
              title="Поиск людей"
            />

            <NavbarButton
              path="/create"
              iconButton={<AddBoxOutlinedIcon />}
              icon={<AddBoxIcon />}
              title="Создать пост"
            />

            <NavbarButton
              path="/followings"
              iconButton={<StarBorderIcon />}
              icon={<StarIcon />}
              title="Подписки"
            />

            <Tooltip title="Аккаунт">
              <IconButton onClick={handleMenu}>
                {location.pathname !== '/profile' &&
                location.pathname !== '/settings' &&
                location.pathname !== '/activity' ? (
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
              <MenuItem onClick={handleNavbarButtonClick('/profile')}>Мой профиль</MenuItem>
              <MenuItem onClick={handleNavbarButtonClick('/activity')}>Активность</MenuItem>
              <MenuItem onClick={handleNavbarButtonClick('/settings')}>Настройки</MenuItem>
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
