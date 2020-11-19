import React from 'react'
import Profile from '../Profile'
import { Box, CircularProgress, GridListTile, makeStyles } from '@material-ui/core'
import { NavLink, useParams } from 'react-router-dom'
import { IPostsFromUserId, postAPI } from '../api/post.api'
import { userAPI } from '../api/user.api'
import { IUser } from '../redux/re-ducks/types'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { selectFollowingStatus, selectUser } from '../redux/re-ducks/user/selectors'

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
    filter: 'grayscale(85%)',
    transition: '0.5s all',
    '&:hover': {
      filter: 'grayscale(0%)',
    },
  },
}))

const UserProfile = () => {
  const classes = useStyles()
  const { userID } = useParams<{ userID: string }>()
  const [userData, setUserData] = React.useState<IUser | null>(null)
  const [postsData, setPostsData] = React.useState<IPostsFromUserId[] | null>(null)
  const followingStatus = useSelector<RootState, boolean | undefined>((state) =>
    selectFollowingStatus(state, userID)
  )
  const user = useSelector(selectUser)

  React.useEffect(() => {
    userAPI.getUserById(userID).then((res) => {
      setUserData(res.data.data)
    })
  }, [userID])

  React.useEffect(() => {
    postAPI.getPostsFromUser(userID).then((res) => {
      setPostsData(res.data.data)
    })
  }, [userID])

  if (!userData || !postsData || followingStatus === undefined || !user)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Box>
    )

  return (
    <Profile
      username={userData.username}
      postsCount={postsData.length}
      followers={userData.followers.length}
      followings={userData.followings.length}
      followingStatus={followingStatus}
      isOwnProfile={user._id === userID}
      userID={userID}
    >
      {postsData.map((post) => (
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
    </Profile>
  )
}

export default UserProfile
