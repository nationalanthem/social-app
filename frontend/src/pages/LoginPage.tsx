import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { userAPI } from '../api/user.api'
import Toast from '../Toast'

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

interface ILoginForm {
  username: string
  password: string
}

const LoginPage = () => {
  const classes = useStyles()

  const [registerError, setRegisterError] = React.useState<string | null>(null)
  const { register, handleSubmit } = useForm<ILoginForm>()

  const onSubmit = handleSubmit(async (data) => {
    setRegisterError(null)

    try {
      const response = await userAPI.login(data.username, data.password)
      const { token } = response.data.data
      localStorage.setItem('token', token)
      window.location.href = '/feed'
    } catch (err) {
      setRegisterError(err.response.data.message)
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Имя пользователя"
            name="username"
            defaultValue={localStorage.getItem('username') || ''}
            autoFocus
          />

          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Пароль"
            name="password"
            type="password"
          />

          {registerError && (
            <Toast closeBtn={true} severity="error" message={registerError} duration={5} />
          )}

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
