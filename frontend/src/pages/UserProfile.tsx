import React from 'react'
import { Box, Link, CircularProgress } from '@material-ui/core'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { IPostsFromUserId, postAPI } from '../api/post.api'
import { userAPI } from '../api/user.api'
import { IUserPopulated } from '../redux/re-ducks/types'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { selectFollowingStatus, selectUser } from '../redux/re-ducks/user/selectors'
import { Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { fetchUser } from '../redux/re-ducks/user/effects'
import { useDispatch } from 'react-redux'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import Toast from '../components/Toast'
import { useStyles } from './MyProfile'

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

const UserProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { userID } = useParams<{ userID: string }>()

  const user = useSelector(selectUser)
  const isFollowing = useSelector<RootState, boolean>((state) =>
    selectFollowingStatus(state, userID)
  )

  const [userLoadingError, setUserLoadingError] = React.useState<string>()

  const [userData, setUserData] = React.useState<IUserPopulated | null>(null)
  const [postsData, setPostsData] = React.useState<IPostsFromUserId[] | null>(null)

  const [isFollowStatusChanging, setIsFollowStatusChanging] = React.useState(false)
  const [isFollowersModalOpen, setIsFollowersModalOpen] = React.useState(false)
  const [isFollowingsModalOpen, setIsFollowingsModalOpen] = React.useState(false)

  React.useEffect(() => {
    userAPI
      .getUserById(userID)
      .then((res) => {
        setUserData(res.data.data)
      })
      .catch((err) => setUserLoadingError(err.response.data.error))
  }, [userID])

  React.useEffect(() => {
    postAPI
      .getPostsFromUser(userID)
      .then((res) => {
        setPostsData(res.data.data)
      })
      .catch(() => {})
  }, [userID])

  const handleFollowerClick = (id: string) => {
    if (!user) return
    if (id === user._id) history.push('/profile')
    else history.push(`/u/${id}`)
    setUserData(null)
    setPostsData(null)
    setIsFollowersModalOpen(false)
  }

  const handleFollowingClick = (id: string) => {
    if (!user) return
    if (id === user._id) history.push('/profile')
    else history.push(`/u/${id}`)
    setUserData(null)
    setPostsData(null)
    setIsFollowingsModalOpen(false)
  }

  const handleFollow = async () => {
    if (isFollowing === null) return

    setIsFollowStatusChanging(true)

    try {
      if (!isFollowing) {
        await userAPI.followUser(userID)
        dispatch(fetchUser())
        const {
          data: { data: userData },
        } = await userAPI.getUserById(userID)
        setUserData(userData)
      } else {
        await userAPI.unfollowUser(userID)
        dispatch(fetchUser())
        const {
          data: { data: userData },
        } = await userAPI.getUserById(userID)
        setUserData(userData)
      }

      setIsFollowStatusChanging(false)
    } catch (err) {
      console.error(err)
    }
  }

  if (userLoadingError) {
    return <Toast severity="error" closeBtn={false} duration={null} message={userLoadingError} />
  }

  if (!userData || !postsData || !user)
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
            src={userData.avatar}
            alt={`Аватар пользователя ${userData.username}`}
            classes={{ root: classes.avatar }}
          >
            {userData.username.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h5" component="h2" className={classes.username}>
            {userData.username}
          </Typography>

          {user._id !== userID && (
            <Button
              color={isFollowing ? 'secondary' : 'primary'}
              variant="contained"
              disabled={isFollowStatusChanging}
              onClick={handleFollow}
            >
              {isFollowing ? 'Отписаться' : 'Подписаться'}
            </Button>
          )}
        </Box>

        <Box display="flex" justifyContent="space-between" mt={5}>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                {postsData.length}
              </Typography>{' '}
              публикаций
            </Typography>
          </Box>

          <Box>
            <Typography
              className={userData.followers.length > 0 ? classes.clickable : undefined}
              variant="body1"
            >
              {userData.followers.length > 0 ? (
                <Link
                  color="textPrimary"
                  underline="none"
                  className={classes.link}
                  onClick={() => setIsFollowersModalOpen(true)}
                >
                  <Typography variant="body1" className={classes.bold} component="span">
                    {userData.followers.length}
                  </Typography>{' '}
                  подписчиков
                </Link>
              ) : (
                <>
                  <Typography variant="body1" className={classes.bold} component="span">
                    {userData.followers.length}
                  </Typography>{' '}
                  подписчиков
                </>
              )}
            </Typography>
            {userData.followers.length > 0 ? (
              <CustomDialog
                dialogTitle="Подписчики"
                open={isFollowersModalOpen}
                onClose={() => setIsFollowersModalOpen(false)}
              >
                {userData.followers.map((follower) => {
                  return (
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
                      <ListItemText
                        primary={`${follower.username}${
                          follower._id === user._id ? ' (это Вы)' : ''
                        }`}
                      />
                    </ListItem>
                  )
                })}
              </CustomDialog>
            ) : null}
          </Box>

          <Box>
            <Typography
              className={userData.followings.length > 0 ? classes.clickable : undefined}
              variant="body1"
            >
              {userData.followings.length > 0 ? (
                <Link
                  color="textPrimary"
                  underline="none"
                  className={classes.link}
                  onClick={() => setIsFollowingsModalOpen(true)}
                >
                  <Typography variant="body1" className={classes.bold} component="span">
                    {userData.followings.length}
                  </Typography>{' '}
                  подписок
                </Link>
              ) : (
                <>
                  <Typography variant="body1" className={classes.bold} component="span">
                    {userData.followings.length}
                  </Typography>{' '}
                  подписок
                </>
              )}
            </Typography>
            {userData.followings.length > 0 ? (
              <CustomDialog
                dialogTitle="Подписки"
                open={isFollowingsModalOpen}
                onClose={() => setIsFollowingsModalOpen(false)}
              >
                {userData.followings.map((following) => (
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
                    <ListItemText
                      primary={`${following.username}${
                        following._id === user._id ? ' (это Вы)' : ''
                      }`}
                    />
                  </ListItem>
                ))}
              </CustomDialog>
            ) : null}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" className={classes.galleryWrapper}>
        <div className={classes.galleryContainer}>
          {postsData.map((post) => (
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

export default UserProfile
