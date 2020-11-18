import { Box, Container } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post, Comment } from '../FeedPost'
import { fetchAllPosts } from '../redux/re-ducks/posts/effects'
import { selectIfPostsLoaded, selectPosts } from '../redux/re-ducks/posts/selectors'
import { CircularProgress } from '@material-ui/core'
import { postAPI } from '../api/post.api'
import { selectUser } from '../redux/re-ducks/user/selectors'

const FeedPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const posts = useSelector(selectPosts)
  const isLoaded = useSelector(selectIfPostsLoaded)

  const handleRequestedOnPostClick = (postID: string, body: string) => {
    postAPI.addComment(postID, body).then((_) => {
      dispatch(fetchAllPosts())
    })
  }

  const handleRequestedOnDeletePostClick = (postID: string) => {
    postAPI.deletePost(postID).then((_) => {
      dispatch(fetchAllPosts())
    })
  }

  const handleRequestedOnCommentClick = (postID: string, commentID: string) => {
    postAPI.deleteComment(postID, commentID).then((_) => {
      dispatch(fetchAllPosts())
    })
  }

  React.useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  return (
    <Container maxWidth="md">
      {posts.length || isLoaded ? (
        posts.map((post) => (
          <Post
            key={post._id}
            postID={post._id}
            deleteBtn={post.author._id === user?._id}
            username={post.author.username}
            image_url={post.image}
            description={post.description}
            onRequestPostClick={handleRequestedOnPostClick}
            onRequestDeletePostClick={handleRequestedOnDeletePostClick}
          >
            {post.comments.map((comment) => (
              <Comment
                key={comment._id}
                postID={post._id}
                commentID={comment._id}
                deleteBtn={comment.author._id === user?._id}
                authorUsername={comment.author.username}
                commentBody={comment.body}
                onRequestCommentClick={handleRequestedOnCommentClick}
              />
            ))}
          </Post>
        ))
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default FeedPage
