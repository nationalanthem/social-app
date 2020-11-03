import { Avatar, Box, Container, makeStyles, Typography } from '@material-ui/core'

import React from 'react'

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
          <Avatar
            alt="User avatar"
            classes={{ root: classes.root }}
            src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80g"
          />

          <Typography variant="h5" component="h1" className={classes.username}>
            Username
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={5}>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                0
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
        <Box display="flex" flexWrap="wrap">
          <img
            style={{ width: '29%', marginRight: '1em', marginBottom: '1em' }}
            src="https://images.unsplash.com/photo-1604419481865-7bb53ed1237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="nature"
          />
          <img
            style={{ width: '29%', marginRight: '1em', marginBottom: '1em' }}
            src="https://images.unsplash.com/photo-1604419481865-7bb53ed1237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="nature"
          />
          <img
            style={{ width: '29%', marginRight: '1em', marginBottom: '1em' }}
            src="https://images.unsplash.com/photo-1604419481865-7bb53ed1237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="nature"
          />
          <img
            style={{ width: '29%', marginRight: '1em', marginBottom: '1em' }}
            src="https://images.unsplash.com/photo-1604419481865-7bb53ed1237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="nature"
          />
          <img
            style={{ width: '29%', marginRight: '1em', marginBottom: '1em' }}
            src="https://images.unsplash.com/photo-1604419481865-7bb53ed1237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="nature"
          />
        </Box>
      </Container>
    </div>
  )
}

export default ProfilePage
