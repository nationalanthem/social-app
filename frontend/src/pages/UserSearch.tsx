import { Container, Grid, TextField, Typography } from '@material-ui/core'
import debounce from 'debounce'
import React from 'react'
import { userAPI } from '../api/user.api'
import { IUserPopulated } from '../redux/re-ducks/types'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  card: {
    minWidth: 215,
  },
  media: {
    height: 140,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}))

const UserSearch = () => {
  const classes = useStyles()

  const [inputValue, setInputValue] = React.useState('')
  const [users, setUsers] = React.useState<IUserPopulated[] | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const db = React.useCallback(
    debounce(async (text: string) => {
      const usersRaw = await userAPI.getUsersByName(text)
      setUsers(usersRaw.data.data)
    }, 1000),
    []
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!value) {
      db.clear()
      setInputValue('')
      setUsers(null)
      return
    }
    setInputValue(value)
    db(value)
  }

  return (
    <Container maxWidth="md">
      <Typography align="center" variant="h5" component="h2">
        Поиск пользователей
      </Typography>
      <TextField
        className={classes.search}
        autoFocus={true}
        value={inputValue}
        onChange={handleInputChange}
        variant="filled"
        fullWidth={true}
        placeholder="Начните вводить имя пользователя"
      />
      <Grid container spacing={2}>
        {users &&
          users.map((user) => (
            <Grid item key={user._id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Link className={classes.link} to={`/u/${user._id}`}>
                    <CardMedia
                      className={classes.media}
                      image={user.avatar ? user.avatar : undefined}
                      title={user.username}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.username}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" component="p">
                        Подписчиков:{' '}
                        <Typography variant="body2" color="textPrimary" component="span">
                          {user.followers.length}
                        </Typography>
                      </Typography>
                      <Typography variant="body1" color="textSecondary" component="p">
                        Подписок:{' '}
                        <Typography variant="body2" color="textPrimary" component="span">
                          {user.followings.length}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default UserSearch
