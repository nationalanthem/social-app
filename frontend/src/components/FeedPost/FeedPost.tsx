import {
  Paper,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { NewComment } from './FeedNewComment'
import React from 'react'
import { Link } from 'react-router-dom'
import PostOptions from './PostOptions'
import { postAPI } from '../../api/post.api'
import { ru } from 'date-fns/locale'
import { formatDistance } from 'date-fns'
import { useStyles } from './FeedPost.styles'

interface Comment {
  _id: string
  username: string
  body: string
}

interface IPostProps {
  onRequestDeletePost?: (postID: string) => void
  postID: string
  authorID: string
  authorUsername: string
  image_url: string
  description: string
  timestamp: Date
  isUser: boolean
  userUsername: string
  children: any
}

export const Post = React.forwardRef(
  (
    {
      onRequestDeletePost,
      authorID,
      timestamp,
      authorUsername,
      children,
      description,
      image_url,
      userUsername,
      isUser,
      postID,
    }: IPostProps,
    ref:
      | ((instance: HTMLButtonElement | null) => void)
      | React.MutableRefObject<HTMLButtonElement | null>
      | null
  ) => {
    const classes = useStyles()
    const [commentBody, setCommentBody] = React.useState('')
    const [comments, setComments] = React.useState<Comment[]>([])
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [unix, setUnix] = React.useState(Date.now())

    React.useEffect(() => {
      const interval = setInterval(() => {
        setUnix(Date.now())
      }, 10000)

      return () => clearInterval(interval)
    }, [])

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setCommentBody(e.target.value)
    }

    const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!commentBody) return

      setCommentBody('')

      postAPI.addComment(postID, commentBody).then((res) => {
        const { comments } = res.data.data
        let lastCommentId: string

        for (let i = comments.length - 1; i >= 0; i--) {
          if (comments[i].author.username === userUsername) {
            lastCommentId = comments[i]._id
            break
          }
        }

        setComments((comments) => [
          ...comments,
          { _id: lastCommentId, username: userUsername, body: commentBody },
        ])
      })
    }

    return (
      <Paper elevation={5} className={classes.root}>
        <Box display="flex" overflow="auto" flexWrap="wrap">
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Avatar className={classes.avatar}>{authorUsername.charAt(0).toUpperCase()}</Avatar>
            <Typography component="h3" variant="h6">
              <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
                {authorUsername}
              </Link>
            </Typography>
          </Box>
          <Box margin="auto">
            <PostOptions
              isAuthor={isUser}
              linkToPost={`/p/${postID}`}
              onDelete={() => {
                setIsDeleting(true)
                if (onRequestDeletePost) onRequestDeletePost(postID)
              }}
            />
          </Box>
        </Box>

        <Box className={classes.imageContainer} position="relative">
          {isDeleting && (
            <Box className={classes.deleted}>
              <CircularProgress />
            </Box>
          )}
          <img
            alt={`Изображение пользователя ${authorUsername}`}
            className={isDeleting ? `${classes.deletedImage} ${classes.image}` : classes.image}
            src={image_url}
          />
        </Box>

        <Typography className={classes.timestamp} variant="body2">
          {formatDistance(new Date(timestamp), unix, {
            locale: ru,
            includeSeconds: true,
            addSuffix: true,
          })}
        </Typography>

        <Typography className={classes.description} variant="body1">
          {description}
        </Typography>
        <Box className={classes.commentsContainer}>
          {children}

          {comments.length
            ? comments.map((comment) => (
                <NewComment
                  key={comment._id}
                  username={comment.username}
                  commentBody={comment.body}
                  onRequestDeleteCommentClick={() => {
                    postAPI.deleteComment(postID, comment._id)
                  }}
                />
              ))
            : null}
        </Box>

        <Box className={classes.addCommentForm}>
          <Box flexGrow={1}>
            <TextField
              onChange={handleCommentChange}
              value={commentBody}
              disabled={isDeleting}
              type="text"
              label="Напишите комментарий"
              multiline={true}
              fullWidth
            />
          </Box>
          <Button
            ref={ref}
            disabled={!commentBody}
            onClick={handleCommentSubmit}
            className={classes.submit}
          >
            Добавить
          </Button>
        </Box>
      </Paper>
    )
  }
)
