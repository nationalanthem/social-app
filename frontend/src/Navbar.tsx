import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
  },
}))

const Navbar = () => {
  const classes = useStyles()

  const [auth, setAuth] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogin = () => {
    setAuth(true)
  }

  const handleExitAccount = () => {
    setAnchorEl(null)
    setAuth(false)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Social App
          </Typography>
          {auth && (
            <div>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
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
                <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                <MenuItem onClick={handleExitAccount}>Выйти из аккаунта</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <>
              <MenuItem onClick={handleLogin}>Вход</MenuItem>
              <MenuItem component={Link} to="/register">
                Регистрация
              </MenuItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
