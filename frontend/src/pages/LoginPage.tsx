import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(20),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  accountNotExist: {
    marginTop: theme.spacing(2),
    textAlign: 'right',
  },
}))

const LoginPage = () => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Имя пользователя"
            name="username"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Пароль"
            name="password"
            type="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>

          <div className={classes.accountNotExist}>
            <Typography variant="body1">
              Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
            </Typography>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default LoginPage
