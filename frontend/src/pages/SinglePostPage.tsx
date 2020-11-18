import { Box, Container } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Post, Comment } from '../SinglePost'
import { CircularProgress } from '@material-ui/core'
import { postAPI } from '../api/post.api'
import { selectUser } from '../redux/re-ducks/user/selectors'
import { useHistory, useParams } from 'react-router-dom'
import { IPost } from '../redux/re-ducks/types'

const SinglePostPage = () => {
  const user = useSelector(selectUser)
  const { postID } = useParams<{ postID: string }>()
  const history = useHistory()
  const [postData, setPostData] = React.useState<IPost | null>(null)

  React.useEffect(() => {
    postAPI.getPostById(postID).then((res) => setPostData(res.data.data))
  }, [postID])

  const handleRequestedAddCommentClick = (
    body: string,
    divRef: React.RefObject<HTMLDivElement>
  ) => {
    postAPI.addComment(postID, body).then((_) => {
      postAPI.getPostById(postID).then((res) => {
        setPostData(res.data.data)
        const refHeight = divRef.current?.scrollHeight
        divRef.current?.scrollBy({ top: refHeight, behavior: 'smooth' })
      })
    })
  }

  const handleRequestedDeleteCommentClick = (commentID: string) => {
    postAPI.deleteComment(postID, commentID).then((_) => {
      postAPI.getPostById(postID).then((res) => setPostData(res.data.data))
    })
  }

  const handleRequestedDeletePostClick = () => {
    postAPI.deletePost(postID).then((_) => {
      history.replace('/')
    })
  }

  return (
    <Container maxWidth="md">
      {postData ? (
        <Post
          key={postData._id}
          deleteBtn={postData.author._id === user?._id}
          username={postData.author.username}
          image_url={postData.image}
          description={postData.description}
          onRequestAddCommentClick={handleRequestedAddCommentClick}
          onRequestDeletePostClick={handleRequestedDeletePostClick}
        >
          {postData.comments.map((comment) => (
            <Comment
              key={comment._id}
              commentID={comment._id}
              deleteBtn={comment.author._id === user?._id}
              authorUsername={comment.author.username}
              commentBody={comment.body}
              onRequestDeleteCommentClick={handleRequestedDeleteCommentClick}
            />
          ))}
        </Post>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default SinglePostPage
