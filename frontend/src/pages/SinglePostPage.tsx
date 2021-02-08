import { Box, Container, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../components/SinglePost/SinglePost'
import { Comment } from '../components/Comment/Comment'
import { CircularProgress } from '@material-ui/core'
import { postAPI } from '../api/post.api'
import { selectUser } from '../redux/re-ducks/user/selectors'
import { useHistory, useParams } from 'react-router-dom'
import { IPost } from '../redux/re-ducks/types'
import { fetchMyPosts } from '../redux/re-ducks/myPosts/effects'
import Toast from '../components/Toast'
import { fetchUser } from '../redux/re-ducks/user/effects'

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 104px)',
  },
}))

const SinglePostPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { postID } = useParams<{ postID: string }>()
  const history = useHistory()
  const [postData, setPostData] = React.useState<IPost | null>(null)
  const [postLoadingError, setPostLoadingError] = React.useState<string>()

  React.useEffect(() => {
    postAPI
      .getPostById(postID)
      .then((res) => setPostData(res.data.data))
      .catch((err) => setPostLoadingError(err.response.data.error))
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

  const handleRequestedDeleteCommentClick = (
    commentID: string,
    isUser: boolean,
    isPostByAuthor?: boolean
  ) => {
    postAPI.deleteComment(postID, commentID).then((_) => {
      postAPI
        .getPostById(postID)
        .then((res) => setPostData(res.data.data))
        .then((_) => {
          if (isPostByAuthor && !isUser) dispatch(fetchUser())
        })
    })
  }

  const handleRequestedDeletePostClick = () => {
    postAPI.deletePost(postID).then((_) => {
      dispatch(fetchMyPosts())
      history.replace('/')
    })
  }

  if (postLoadingError) {
    return <Toast severity="error" closeBtn={false} duration={null} message={postLoadingError} />
  }

  return (
    <Container maxWidth="md">
      {postData ? (
        <Post
          key={postData._id}
          authorID={postData.author._id}
          isUser={postData.author._id === user?._id}
          authorUsername={postData.author.username}
          image_url={postData.image}
          description={postData.description}
          onRequestAddCommentClick={handleRequestedAddCommentClick}
          onRequestDeletePostClick={handleRequestedDeletePostClick}
          timestamp={postData.createdAt}
          avatar={postData.author.avatar}
        >
          {postData.comments.map((comment) => (
            <Comment
              key={comment._id}
              authorID={comment.author._id}
              commentID={comment._id}
              isUser={comment.author._id === user?._id}
              authorUsername={comment.author.username}
              commentBody={comment.body}
              onRequestDeleteCommentClick={handleRequestedDeleteCommentClick}
              isPostByAuthor={postData.author._id === user?._id}
            />
          ))}
        </Post>
      ) : (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default SinglePostPage
