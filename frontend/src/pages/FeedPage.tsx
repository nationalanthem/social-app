import {
  Box,
  Container,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  LinearProgress,
} from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../FeedPost'
import { Comment } from '../FeedComment'
import { fetchRecentPosts, fetchRestPosts, fetchOnlyMyPosts } from '../redux/re-ducks/posts/effects'
import {
  selectIfPostsLoaded,
  selectPosts,
  selectTotalPages,
  selectCurrentPage,
  selectIfRestPostsLoading,
} from '../redux/re-ducks/posts/selectors'
import { postAPI } from '../api/post.api'
import { selectUser } from '../redux/re-ducks/user/selectors'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  topLoading: {
    position:'absolute',
    width: '100%',
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
  const postsLoaded = useSelector(selectIfPostsLoaded)
  const restPostsLoading = useSelector(selectIfRestPostsLoading)
  const totalPages = useSelector(selectTotalPages)
  const currentPage = useSelector(selectCurrentPage)

  const observer = React.useRef<IntersectionObserver>()
  const lastPost = React.useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage && totalPages) {
          if (currentPage < totalPages) dispatch(fetchRestPosts(currentPage + 1))
        }
      })

      if (element) observer.current.observe(element)
    },
    [dispatch, totalPages, currentPage]
  )

  const [postsCategory, setPostsCategory] = React.useState<PostsCategory>(PostsCategory.all)

  const handlePostsCategoryChange = (event: React.ChangeEvent<{}>, category: PostsCategory) => {
    setPostsCategory(category)
  }

  React.useEffect(() => {
    if (postsCategory === PostsCategory.all && !postsLoaded) {
      dispatch(fetchRecentPosts())
    }
  }, [dispatch, postsCategory, postsLoaded])

  const handleRequestedOnDeletePostClick = (postID: string) => {
    postAPI.deletePost(postID).then((_) => {
      dispatch(fetchRecentPosts())
      dispatch(fetchOnlyMyPosts())
    })
  }

  if (!user) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="16vh">
        <CircularProgress />
      </Box>
    )
  }

  return (<>
    {!postsLoaded && <LinearProgress className={classes.topLoading} />}
    <Container maxWidth="md">
      <Paper className={classes.tabs}>
        
        <Tabs
          value={postsCategory}
          onChange={handlePostsCategoryChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            icon={<RestoreIcon />}
            disabled={!postsLoaded}
            onClick={() => {
              if (postsCategory === PostsCategory.all) {
                dispatch(fetchRecentPosts())
              }
            }}
            label="Последние"
          />
          <Tab disabled={!postsLoaded} icon={<FavoriteIcon />} label="Отслеживаемые" />
        </Tabs>
      </Paper>

      {postsLoaded && !posts.length && postsCategory === PostsCategory.all ? (
        <Typography align="center">Ничего нет :(</Typography>
      ) : posts.length || postsLoaded ? (
        <>
          {posts.map((post, index) => {
            if (postsCategory === PostsCategory.followings) {
              if (!user.followings.find((following) => following._id === post.author._id)) {
                return null
              }
            }

            return (
              <Post
                ref={posts.length === index + 1 ? lastPost : null}
                authorID={post.author._id}
                key={post._id}
                postID={post._id}
                isUser={post.author._id === user._id}
                authorUsername={post.author.username}
                userUsername={user.username}
                image_url={post.image}
                description={post.description}
                onRequestDeletePostClick={handleRequestedOnDeletePostClick}
                timestamp={post.createdAt}
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

          {restPostsLoading && posts.length > 2 && (
            <Box mt={3} mb={3} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {postsCategory === PostsCategory.followings && !user.followings.length && (
            <Typography align="center">У вас нет подписок</Typography>
          )}
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="70vh">
          <CircularProgress />
        </Box>
      )}
    </Container>
  </>)
}

export default FeedPage
