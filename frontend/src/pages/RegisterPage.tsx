import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop: theme.spacing(20),
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  accountExist: {
    marginTop: theme.spacing(2),
    textAlign: 'right',
  },
}))

const RegisterPage = () => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
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

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            helperText="Введите пароль повторно"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зарегистрироваться
          </Button>

          <div className={classes.accountExist}>
            <Typography variant="body1">
              Уже есть аккаунт? <Link to="/login">Войдите</Link>
            </Typography>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default RegisterPage
