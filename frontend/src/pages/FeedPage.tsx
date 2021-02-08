import { Box, Container, CircularProgress, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { Post } from '../components/FeedPost/FeedPost'
import { Comment } from '../components/Comment/Comment'
import { usePosts } from '../hooks/usePosts'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/re-ducks/user/selectors'
import { postAPI } from '../api/post.api'
import { fetchMyPosts } from '../redux/re-ducks/myPosts/effects'
import { useHistory } from 'react-router-dom'
import { useObserver } from '../hooks/useObserver'

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 104px)',
  },
}))

const FeedPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(selectUser)

  const [page, setPage] = React.useState(1)

  const { posts, loading, hasNextPage } = usePosts(page, postAPI.fetchPosts)

  const lastPost = useObserver(loading, hasNextPage, setPage)

  const handleRequestDeletePost = (postID: string) => {
    postAPI.deletePost(postID).then((_) => {
      dispatch(fetchMyPosts())
      history.go(0)
    })
  }

  return (
    <Container maxWidth="md">
      {!posts.length && !loading && <Typography align="center">Ничего нет</Typography>}

      {!user || (!posts.length && loading) ? (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      ) : (
        posts.map((post, index) => {
          return (
            <Post
              key={post._id}
              ref={posts.length === index + 1 ? lastPost : null}
              authorID={post.author._id}
              postID={post._id}
              authorUsername={post.author.username}
              isUser={user._id === post.author._id}
              userUsername={user.username}
              image_url={post.image}
              description={post.description}
              timestamp={post.createdAt}
              onRequestDeletePost={handleRequestDeletePost}
              avatar={post.author.avatar}
            >
              {post.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  authorID={comment.author._id}
                  postID={post._id}
                  commentID={comment._id}
                  authorUsername={comment.author.username}
                  isUser={user._id === comment.author._id}
                  commentBody={comment.body}
                  isPostByAuthor={post.author._id === user._id}
                />
              ))}
            </Post>
          )
        })
      )}

      {loading && posts.length >= 3 && (
        <Box mt={10} mb={10} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default FeedPage
