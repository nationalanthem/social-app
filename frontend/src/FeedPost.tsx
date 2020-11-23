import { Paper, Typography, Avatar, Box, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NewComment} from './FeedNewComment'
import React from 'react'
import { Link } from 'react-router-dom'
import PostOptions from './PostOptions'
import { postAPI } from './api/post.api'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  imageContainer: {
    margin: '1.5em -16px',
    maxHeight: '40vh',
    backgroundColor: 'rgb(53, 53, 53)'
  },
  image: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    maxHeight:'40vh',
  },

  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
  },
  commentsContainer: {
    marginTop: '2em',
  },
  addCommentForm: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  submit: {
    marginLeft: theme.spacing(2),
  },
}))

interface Comment {
  _id: string
  username: string
  body: string
}

interface IPostProps {
  onRequestDeletePostClick: (postID: string) => void
  postID: string
  authorID: string
  isUser: boolean
  authorUsername: string
  userUsername: string
  image_url: string
  description: string
}

export const Post: React.FC<IPostProps> = ({
  onRequestDeletePostClick,
  postID,
  authorID,
  isUser,
  authorUsername,
  userUsername,
  image_url,
  description,
  children,
}) => {
  const classes = useStyles()
  const [commentBody, setCommentBody] = React.useState('')
  const [comments, setComments] = React.useState<Comment[]>([])

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCommentBody(e.target.value)
  }

  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!commentBody) return

    setCommentBody('')

    postAPI.addComment(postID, commentBody).then(res => {
      const { comments } = res.data.data
      let lastCommentId: string 

      for (let i = comments.length - 1; i >= 0; i--) {
        if (comments[i].author.username === userUsername) {
          lastCommentId = comments[i]._id
          break
        } 
      }

      setComments(comments => [...comments, { _id: lastCommentId, username: userUsername, body: commentBody }])
    })
  }

  return (
    <Paper elevation={5} className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="space-between" position="relative">
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar}>{authorUsername.charAt(0).toUpperCase()}</Avatar>
          <Typography component="h3" variant="h6">
            <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
              {authorUsername}
            </Link>
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <PostOptions
            isAuthor={isUser}
            linkToPost={`/p/${postID}`}
            onDelete={() => {
              onRequestDeletePostClick(postID)
            }}
          />
        </Box>
      </Box>
      <Box className={classes.imageContainer}>
        <img
          alt={`Изображение пользователя ${authorUsername}`}
          className={classes.image}
          src={image_url}
        />
      </Box>
      <Typography>{description}</Typography>
      <Box className={classes.commentsContainer}>

        {children}

        {comments.length ? comments.map((comment) => (
          <NewComment
            key={comment._id}
            username={comment.username}
            commentBody={comment.body}
            onRequestDeleteCommentClick={() => {
              postAPI.deleteComment(postID, comment._id)
            }}
        />
        )) : null}
      </Box>
      <Box className={classes.addCommentForm}>
        <TextField
          onChange={handleCommentChange}
          value={commentBody}
          type="text"
          label="Напишите комментарий"
          multiline={true}
          fullWidth
        />
        <Button disabled={!commentBody} onClick={handleCommentSubmit} className={classes.submit}>
          Добавить
        </Button>
      </Box>
    </Paper>
  )
}
