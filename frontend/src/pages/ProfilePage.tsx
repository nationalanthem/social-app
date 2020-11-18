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
import { fetchOnlyMyPosts } from '../redux/re-ducks/posts/effects'
import { selectUser } from '../redux/re-ducks/user/selectors'
import { NavLink } from 'react-router-dom'

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
  image: {
    maxWidth: '100%',
    filter: 'grayscale(85%)',
    transition: '0.5s all',
    '&:hover': {
      filter: 'grayscale(0%)',
    },
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
          <GridList cellHeight={300} cols={3} spacing={5}>
            {myPosts.map((post) => (
              <GridListTile key={post._id}>
                <NavLink to={`/p/${post._id}`}>
                  <img
                    src={post.image}
                    className={classes.image}
                    draggable={false}
                    alt={
                      post.description.length > 50
                        ? `${post.description.slice(0, 50)}...`
                        : post.description
                    }
                  />
                </NavLink>
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
