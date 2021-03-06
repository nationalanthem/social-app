import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIfMyPostsLoaded, selectMyPosts } from '../redux/re-ducks/myPosts/selectors'
import { fetchMyPosts } from '../redux/re-ducks/myPosts/effects'
import { selectAvatar, selectUser } from '../redux/re-ducks/user/selectors'
import { Box, CircularProgress, Link, makeStyles } from '@material-ui/core'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'

interface CustomDialogProps {
  dialogTitle: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  dialogTitle,
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <List>{children}</List>
    </Dialog>
  )
}

export const useStyles = makeStyles((theme) => ({
  galleryWrapper: {
    marginTop: '5em',
  },
  galleryContainer: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 325,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 535,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 895,
    },
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageDiv: {
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.up('sm')]: {
      width: 170,
      height: 170,
    },
    [theme.breakpoints.up('md')]: {
      width: 290,
      height: 290,
    },
    width: 200,
    height: 200,
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.up('sm')]: {
      width: 170,
      height: 170,
    },
    [theme.breakpoints.up('md')]: {
      width: 290,
      height: 290,
    },
    width: 200,
    height: 200,
    objectFit: 'cover',
    objectPosition: 'center',
    filter: 'grayscale(85%)',
    transition: '0.5s all',
    '&:hover': {
      filter: 'grayscale(0%)',
    },
  },
  clickable: {
    cursor: 'pointer',
    '&:active': {
      opacity: 0.5,
    },
  },
  link: {
    display: 'block',
  },
  bold: {
    fontWeight: 700,
  },
  avatar: {
    width: 200,
    height: 200,
  },
  username: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 104px)',
  },
}))

const MyProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(selectUser)
  const avatar = useSelector(selectAvatar)
  const myPosts = useSelector(selectMyPosts)
  const myPostsLoaded = useSelector(selectIfMyPostsLoaded)

  const [isFollowersModalOpen, setIsFollowersModalOpen] = React.useState(false)
  const [isFollowingsModalOpen, setIsFollowingsModalOpen] = React.useState(false)

  const handleFollowerClick = (id: string) => {
    history.push(`/u/${id}`)
    setIsFollowersModalOpen(false)
  }

  const handleFollowingClick = (id: string) => {
    history.push(`/u/${id}`)
    setIsFollowingsModalOpen(false)
  }

  React.useEffect(() => {
    if (!myPostsLoaded) {
      dispatch(fetchMyPosts())
    }
  }, [dispatch, myPostsLoaded])

  if ((!myPosts.length && !myPostsLoaded) || !user)
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    )

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
            alt={`Аватар пользователя ${user.username}`}
            src={avatar}
            classes={{ root: classes.avatar }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h5" component="h2" className={classes.username}>
            {user.username}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={5}>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                {myPosts.length}
              </Typography>{' '}
              публикаций
            </Typography>
          </Box>

          <Box>
            <Typography
              className={user.followers.length > 0 ? classes.clickable : undefined}
              variant="body1"
            >
              {user.followers.length > 0 ? (
                <Link
                  color="textPrimary"
                  underline="none"
                  className={classes.link}
                  onClick={() => setIsFollowersModalOpen(true)}
                >
                  <Typography variant="body1" className={classes.bold} component="span">
                    {user.followers.length}
                  </Typography>{' '}
                  подписчиков
                </Link>
              ) : (
                <>
                  <Typography variant="body1" className={classes.bold} component="span">
                    {user.followers.length}
                  </Typography>{' '}
                  подписчиков
                </>
              )}
            </Typography>
            {user.followers.length > 0 ? (
              <CustomDialog
                dialogTitle="Подписчики"
                open={isFollowersModalOpen}
                onClose={() => setIsFollowersModalOpen(false)}
              >
                {user.followers.map((follower) => (
                  <ListItem
                    key={follower._id}
                    button
                    onClick={() => handleFollowerClick(follower._id)}
                  >
                    <ListItemAvatar>
                      <Avatar src={follower.avatar}>
                        {follower.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={follower.username} />
                  </ListItem>
                ))}
              </CustomDialog>
            ) : null}
          </Box>

          <Box>
            <Typography
              className={user.followings.length > 0 ? classes.clickable : undefined}
              variant="body1"
            >
              {user.followings.length > 0 ? (
                <Link
                  color="textPrimary"
                  underline="none"
                  className={classes.link}
                  onClick={() => setIsFollowingsModalOpen(true)}
                >
                  <Typography variant="body1" className={classes.bold} component="span">
                    {user.followings.length}
                  </Typography>{' '}
                  подписок
                </Link>
              ) : (
                <>
                  <Typography variant="body1" className={classes.bold} component="span">
                    {user.followings.length}
                  </Typography>{' '}
                  подписок
                </>
              )}
            </Typography>
            {user.followings.length > 0 ? (
              <CustomDialog
                dialogTitle="Подписки"
                open={isFollowingsModalOpen}
                onClose={() => setIsFollowingsModalOpen(false)}
              >
                {user.followings.map((following) => (
                  <ListItem
                    key={following._id}
                    button
                    onClick={() => handleFollowingClick(following._id)}
                  >
                    <ListItemAvatar>
                      <Avatar src={following.avatar}>
                        {following.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={following.username} />
                  </ListItem>
                ))}
              </CustomDialog>
            ) : null}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" className={classes.galleryWrapper}>
        <div className={classes.galleryContainer}>
          {myPosts.map((post) => (
            <div className={classes.imageDiv} key={post._id}>
              <RouterLink to={`/p/${post._id}`}>
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
              </RouterLink>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default MyProfile
