import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIfMyPostsLoaded, selectMyPosts } from '../redux/re-ducks/posts/selectors'
import { fetchOnlyMyPosts } from '../redux/re-ducks/posts/effects'
import { selectUser } from '../redux/re-ducks/user/selectors'
import Profile from '../Profile'
import { Box, CircularProgress, GridListTile, makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

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

const MyProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const myPosts = useSelector(selectMyPosts)
  const myPostsLoaded = useSelector(selectIfMyPostsLoaded)

  React.useEffect(() => {
    if (!myPostsLoaded) {
      dispatch(fetchOnlyMyPosts())
    }
  }, [dispatch, myPostsLoaded])

  if ((!myPosts.length && !myPostsLoaded) || !user)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Box>
    )

  return (
    <Profile
      username={user.username}
      postsCount={myPosts.length}
      followers={user.followers.length}
      followings={user.followings.length}
    >
      {myPosts.length || myPostsLoaded ? (
        myPosts.map((post) => (
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
        ))
      ) : (
        <GridListTile cols={3}>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </GridListTile>
      )}
    </Profile>
  )
}

export default MyProfile
