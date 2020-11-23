import { Box, Container, makeStyles, Paper, Tab, Tabs, Typography, Zoom } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../FeedPost'
import { Comment } from '../FeedComment'
import { fetchAllPosts, fetchOnlyMyPosts } from '../redux/re-ducks/posts/effects'
import { selectIfPostsLoaded, selectPosts } from '../redux/re-ducks/posts/selectors'
import { CircularProgress } from '@material-ui/core'
import { postAPI } from '../api/post.api'
import { selectUser } from '../redux/re-ducks/user/selectors'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  centeredText: {
    textAlign: 'center',
  },
  fixedPaper: {
    position: 'fixed',
    zIndex: 100,
    width: 150,
    padding: theme.spacing(2),
    opacity: 0.8,
    top: theme.spacing(3),
    left: '50%',
    marginLeft: -75,
  },
}))

enum PostsCategory {
  all = 0,
  followings = 1,
}

const FeedPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const posts = useSelector(selectPosts)
  const isLoaded = useSelector(selectIfPostsLoaded)

  const [postsCategory, setPostsCategory] = React.useState<PostsCategory>(PostsCategory.all)

  const handlePostsCategoryChange = (event: React.ChangeEvent<{}>, category: PostsCategory) => {
    setPostsCategory(category)
  }

  React.useEffect(() => {
    if (postsCategory === PostsCategory.all) {
      dispatch(fetchAllPosts())
    }
  }, [postsCategory, dispatch])

  const handleRequestedOnDeletePostClick = (postID: string) => {
    postAPI.deletePost(postID).then((_) => {
      dispatch(fetchAllPosts())
      dispatch(fetchOnlyMyPosts())
    })
  }

  if (!user) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="70vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="md">
      <Paper className={classes.tabs}>
        <Tabs
          value={postsCategory}
          onChange={handlePostsCategoryChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<RestoreIcon />} label="Последние" />
          <Tab disabled={!isLoaded} icon={<FavoriteIcon />} label="Отслеживаемые" />
        </Tabs>
      </Paper>

      <Zoom in={!isLoaded}>
        <Paper className={classes.fixedPaper}>
          <Typography>Обновление...</Typography>
        </Paper>
      </Zoom>

      {isLoaded && !posts.length && postsCategory === PostsCategory.all ? (
        <Typography className={classes.centeredText}>Ничего нет :(</Typography>
      ) : posts.length || isLoaded ? (
        <>
          {posts.map((post) => {
            if (postsCategory === PostsCategory.followings) {
              if (!user.followings.find((following) => following._id === post.author._id)) {
                return null
              }
            }

            return (
              <Post
                authorID={post.author._id}
                key={post._id}
                postID={post._id}
                isUser={post.author._id === user._id}
                authorUsername={post.author.username}
                userUsername={user.username}
                image_url={post.image}
                description={post.description}
                onRequestDeletePostClick={handleRequestedOnDeletePostClick}
              >
                {post.comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    authorID={comment.author._id}
                    postID={post._id}
                    commentID={comment._id}
                    isUser={comment.author._id === user._id}
                    authorUsername={comment.author.username}
                    commentBody={comment.body}
                  />
                ))}
              </Post>
            )
          })}

          {postsCategory === PostsCategory.followings && !user.followings.length && (
            <Typography className={classes.centeredText}>У вас нет подписок</Typography>
          )}
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="70vh">
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default FeedPage
