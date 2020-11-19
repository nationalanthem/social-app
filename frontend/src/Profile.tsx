import React from 'react'
import { Avatar, Box, Button, Container, GridList, makeStyles, Typography } from '@material-ui/core'
import { userAPI } from './api/user.api'
import { fetchUser } from './redux/re-ducks/user/effects'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,
  },
  username: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  bold: {
    fontWeight: 700,
  },
  galleryContainer: {
    marginTop: '5em',
  },
}))

interface ProfileProps {
  username: string
  followers: number
  followings: number
  postsCount: number
  userID?: string
  followingStatus?: boolean
  isOwnProfile?: boolean
}

const Profile: React.FC<ProfileProps> = ({
  username,
  postsCount,
  followers,
  followings,
  userID,
  followingStatus,
  isOwnProfile,
  children,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isFollowing, setIsFollowing] = React.useState<boolean | null>(null)
  const [isFollowStatusChanging, setIsFollowStatusChanging] = React.useState<boolean>(false)
  const [followersCount, setFollowersCount] = React.useState<number>(followers)

  React.useEffect(() => {
    if (followingStatus !== undefined) {
      setIsFollowing(followingStatus)
    }
  }, [followingStatus])

  const handleFollow = () => {
    if (!userID || isFollowing === null) return

    setIsFollowStatusChanging(true)
    if (!isFollowing) {
      userAPI
        .followUser(userID)
        .then((_) => {
          dispatch(fetchUser())
          setIsFollowing(true)
          setFollowersCount((prevCount) => ++prevCount)
          setIsFollowStatusChanging(false)
        })
        .catch((err) => console.log(err.response))
    } else {
      userAPI.unfollowUser(userID).then((_) => {
        dispatch(fetchUser())
        setIsFollowing(false)
        setFollowersCount((prevCount) => --prevCount)
        setIsFollowStatusChanging(false)
      })
    }
  }

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
          <Avatar alt={`Аватар пользователя ${username}`} classes={{ root: classes.root }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h5" component="h1" className={classes.username}>
            {username}
          </Typography>

          {isFollowing !== null && isOwnProfile === false && (
            <Button
              color={isFollowing ? 'secondary' : 'primary'}
              variant="outlined"
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
                {postsCount}
              </Typography>{' '}
              публикаций
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                {followersCount}
              </Typography>{' '}
              подписчиков
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              <Typography variant="body1" className={classes.bold} component="span">
                {followings}
              </Typography>{' '}
              подписок
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg" className={classes.galleryContainer}>
        <GridList cellHeight={300} cols={3} spacing={5}>
          {children}
        </GridList>
      </Container>
    </div>
  )
}

export default Profile
