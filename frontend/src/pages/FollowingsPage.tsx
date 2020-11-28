import { Box, Container, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { Post } from '../components/FeedPost/FeedPost'
import { Comment } from '../components/Comment/Comment'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/re-ducks/user/selectors'
import { usePosts } from '../hooks/usePosts'
import { useObserver } from '../hooks/useObserver'
import { postAPI } from '../api/post.api'

const FollowingsPage = () => {
  const user = useSelector(selectUser)

  const [page, setPage] = React.useState(1)

  const { posts, loading, hasNextPage } = usePosts(page, postAPI.fetchFollowings)

  const lastPost = useObserver(loading, hasNextPage, setPage)

  return (
    <Container maxWidth="md">
      {!posts.length && !loading && <Typography align="center">Ничего нет</Typography>}

      {!user || (!posts.length && loading) ? (
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
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
              isUser={false}
              userUsername={user.username}
              image_url={post.image}
              description={post.description}
              timestamp={post.createdAt}
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
                />
              ))}
            </Post>
          )
        })
      )}

      {loading && posts.length >= 3 && (
        <Box mt={5} mb={5} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default FollowingsPage
