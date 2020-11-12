import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link, useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import { userAPI } from '../api/user.api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Toast from '../Toast'

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

interface IRegisterForm {
  username: string
  password: string
  confirmPassword: string
}

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(5, 'Имя пользователя может содержать не менее 5 символов')
    .max(20, 'Имя пользователя может содержать не более 20 символов')
    .matches(
      /^([a-zA-Z0-9_]+)$/,
      'Имя пользователя может содержать буквы латинского алфавита (A-Z), цифры (0-9), и нижнее подчёркивание (_)'
    )
    .trim(),
  password: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(6, 'Пароль может содержать не менее 6 символов')
    .max(16, 'Пароль может содержать не более 16 символов'),
  confirmPassword: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(6, 'Пароль может содержать не менее 6 символов')
    .max(16, 'Пароль может содержать не более 16 символов'),
})

const RegisterPage = () => {
  const [registerError, setRegisterError] = useState<string | null>(null)

  const classes = useStyles()
  const history = useHistory()

  const { register, handleSubmit, errors, setError } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'notEqual', message: 'Пароли не совпадают' })
      return
    }

    setRegisterError(null)

    try {
      await userAPI.register(data.username, data.password)
      localStorage.setItem('username', data.username)
      history.push('/login')
    } catch (err) {
      setRegisterError(err.response.data.message)
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Имя пользователя"
            name="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Введите пароль повторно"
            name="confirmPassword"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {registerError && (
            <Toast closeBtn={true} duration={5000} severity="error" message={registerError} />
          )}

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
