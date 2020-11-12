import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@material-ui/core/'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link, useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
  },
  home: {
    textDecoration: 'none',
    color: 'inherit',
    transition: '.1s',
    '&:hover': {
      color: 'blue',
    },
  },
}))

interface NavbarProps {
  authToken: string | null
}

const Navbar: React.FC<NavbarProps> = ({ authToken }) => {
  const classes = useStyles()

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
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {!!authToken && location.pathname !== '/feed' ? (
              <Link to="/feed" className={classes.home}>
                Social App
              </Link>
            ) : (
              'Social App'
            )}
          </Typography>
          {!!authToken ? (
            <div>
              <Box display="flex">
                {location.pathname !== '/create' && (
                  <MenuItem component={Link} to="/create">
                    Создать пост
                  </MenuItem>
                )}
                <IconButton onClick={handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
              </Box>
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
            </div>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <MenuItem component={Link} to="/login">
                  Вход
                </MenuItem>
              )}
              {location.pathname !== '/register' && (
                <MenuItem component={Link} to="/register">
                  Регистрация
                </MenuItem>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
