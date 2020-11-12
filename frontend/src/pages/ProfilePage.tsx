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
import { IPost, postAPI } from '../api/post.api'
import { useUserContext } from '../context/UserContext'

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
  const user = useUserContext()

  const [myPostsData, setMyPostsData] = React.useState<IPost[] | null>(null)

  React.useEffect(() => {
    postAPI
      .fetchPosts()
      .then((res) => {
        setMyPostsData(res.data.data)
      })
      .catch((err) => {
        alert('Ошибка при загрузке данных')
        console.log(err.response)
      })
  }, [])

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
            {user ? user.username.charAt(0).toUpperCase() : '...'}
          </Avatar>

          <Typography variant="h5" component="h1" className={classes.username}>
            {user ? user.username : '...'}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={5}>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                {myPostsData ? myPostsData.length : '...'}
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
        {myPostsData ? (
          <GridList cellHeight={250} cols={3} spacing={10}>
            {myPostsData.map((post) => (
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
