import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  makeStyles,
  Paper,
  Typography,
  Zoom,
} from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post, Comment } from '../FeedPost'
import { fetchAllPosts, fetchOnlyMyPosts } from '../redux/re-ducks/posts/effects'
import { selectIfPostsLoaded, selectPosts } from '../redux/re-ducks/posts/selectors'
import { CircularProgress } from '@material-ui/core'
import { postAPI } from '../api/post.api'
import { selectUser } from '../redux/re-ducks/user/selectors'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  filter: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  filterButton: {
    maxWidth: 'none',
    '&:not(:last-child)': {
      borderRight: '1px solid',
      borderColor: 'dimgray !important',
    },
  },
  centeredText: {
    textAlign: 'center',
  },
  fixedPaper:{
    position:'fixed',
    zIndex:100,
    width:150,
    padding: theme.spacing(2),
    opacity: 0.8,
    top: theme.spacing(3),
    left: '50%',
    marginLeft: -75
  }
}))

type PostsCategory = 'all' | 'following'

const FeedPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const posts = useSelector(selectPosts)
  const isLoaded = useSelector(selectIfPostsLoaded)

  const [postsCategory, setPostsCategory] = React.useState<PostsCategory>('all')

  const handlePostsCategoryChange = (event: React.ChangeEvent<{}>, category: PostsCategory) => {
    setPostsCategory(category)
  }

  React.useEffect(() => {
    if (postsCategory === 'all') {
      dispatch(fetchAllPosts())
    }
  }, [postsCategory, dispatch])

  const handleRequestedOnAddCommentClick = (postID: string, body: string) => {
    postAPI.addComment(postID, body).then((_) => {
      dispatch(fetchAllPosts())
    })
  }

  const handleRequestedOnDeletePostClick = (postID: string) => {
    postAPI.deletePost(postID).then((_) => {
      dispatch(fetchAllPosts())
      dispatch(fetchOnlyMyPosts())
    })
  }

  const handleRequestedOnDeleteCommentClick = (postID: string, commentID: string) => {
    postAPI.deleteComment(postID, commentID).then((_) => {
      dispatch(fetchAllPosts())
    })
  }

  return (
    <Container maxWidth="md">
      <BottomNavigation
        value={postsCategory}
        onChange={handlePostsCategoryChange}
        className={classes.filter}
      >
        <BottomNavigationAction
          label="Последние"
          value="all"
          icon={<RestoreIcon />}
          classes={{ root: classes.filterButton }}
        />
        <BottomNavigationAction
          label="Отслеживаемые"
          value="following"
          icon={<FavoriteIcon />}
          classes={{ root: classes.filterButton }}
          disabled={!isLoaded}
        />
      </BottomNavigation>

      <Zoom in={!isLoaded}>
        <Paper className={classes.fixedPaper}><Typography>Обновление...</Typography></Paper>
      </Zoom>

      {user && (posts.length || isLoaded) ? (
        <>
          {posts.map((post) => {
            if (postsCategory === 'following') {
              if (!user.followings.find((following) => following._id === post.author._id)) {
                return null
              }
            }

            return (
              <Post
                key={post._id}
                authorID={post.author._id}
                postID={post._id}
                isUser={post.author._id === user._id}
                authorUsername={post.author.username}
                image_url={post.image}
                description={post.description}
                onRequestAddCommentClick={handleRequestedOnAddCommentClick}
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
                    onRequestCommentClick={handleRequestedOnDeleteCommentClick}
                  />
                ))}
              </Post>
            )
          })}

          {postsCategory === 'following' && !user.followings.length && (
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
