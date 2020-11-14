import {
  Avatar,
  Box,
  Container,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
} from '@material-ui/core'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMyPosts } from '../redux/re-ducks/posts/selectors'
import { fetchOnlyMyPosts } from '../redux/re-ducks/posts'
import { selectUser } from '../redux/re-ducks/user/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,
  },
  username: {
    marginTop: theme.spacing(5),
  },
  bold: {
    fontWeight: 700,
  },
  galleryContainer: {
    marginTop: '5em',
  },
}))

const ProfilePage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const myPosts = useSelector(selectMyPosts)

  React.useEffect(() => {
    dispatch(fetchOnlyMyPosts())
  }, [dispatch, user])

  return (
    <div>
      <Container maxWidth="xs">
        <Box
          mt={5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar alt={`${user ? user.username : 'User'} avatar`} classes={{ root: classes.root }}>
            {user ? user.username.charAt(0).toUpperCase() : ''}
          </Avatar>

          <Typography variant="h5" component="h1" className={classes.username}>
            {user ? user.username : '...'}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={5}>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                {myPosts ? myPosts.length : '...'}
              </Typography>{' '}
              публикаций
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                0
              </Typography>{' '}
              подписчиков
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                0
              </Typography>{' '}
              подписок
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg" className={classes.galleryContainer}>
        {myPosts ? (
          <GridList cellHeight={250} cols={3} spacing={10}>
            {myPosts.map((post) => (
              <GridListTile key={post._id}>
                <img
                  src={post.image}
                  alt={
                    post.description.length > 50
                      ? `${post.description.slice(0, 50)}...`
                      : post.description
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        ) : (
          'Загрузка...'
        )}
      </Container>
    </div>
  )
}

export default ProfilePage
