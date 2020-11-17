import { Paper, Typography, Avatar, Box, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  imageContainer: {
    margin: '1.5em 0',
  },
  commentsContainer: {
    marginTop: '2em',
  },
  commentBody: {
    overflowWrap: 'break-word',
    position: 'relative',
    width: '97%',
  },
  commentUsername: {
    fontWeight: 'bolder',
    marginRight: '10px',
    float: 'left',
  },
  deletePostIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    transition: '0.1s all',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
    '&:active': {
      top: '2px',
    },
  },
  deleteCommentIcon: {
    position: 'absolute',
    top: 0,
    right: -30,
    transition: '0.1s all',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
    '&:active': {
      top: '2px',
    },
  },
  addCommentForm: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  submit: {
    marginLeft: theme.spacing(2),
  },
}))

interface CommentProps {
  onRequestCommentClick: (postID: string, commentID: string) => void
  authorUsername: string
  commentBody: string
  postID: string
  commentID: string
  deleteBtn: boolean
}

export const Comment: React.FC<CommentProps> = ({
  onRequestCommentClick,
  postID,
  commentID,
  authorUsername,
  commentBody,
  deleteBtn,
}) => {
  const classes = useStyles()

  const [isDeleting, setIsDeleting] = React.useState(false)

  return (
    <>
      <Box mb={2}>
        <Box className={classes.commentBody}>
          <Typography variant="body2" component="h4" className={classes.commentUsername}>
            {authorUsername}
          </Typography>
          <Typography variant="body2" component="span">
            {commentBody}
          </Typography>
          {deleteBtn && (
            <i
              onClick={() => {
                setIsDeleting(true)
                onRequestCommentClick(postID, commentID)
              }}
              className={classes.deleteCommentIcon}
            >
              {isDeleting ? <DeleteForeverIcon /> : <DeleteIcon />}
            </i>
          )}
        </Box>
      </Box>
    </>
  )
}

interface IPostProps {
  onRequestPostClick: (postID: string, body: string) => void
  onRequestDeletePostClick: (postID: string) => void
  postID: string
  deleteBtn: boolean
  username: string
  image_url: string
  description: string
}

export const Post: React.FC<IPostProps> = ({
  onRequestPostClick,
  onRequestDeletePostClick,
  postID,
  deleteBtn,
  username,
  image_url,
  description,
  children,
}) => {
  const classes = useStyles()
  const [commentBody, setCommentBody] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCommentBody(e.target.value)
  }

  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!commentBody) return
    onRequestPostClick(postID, commentBody)
    setCommentBody('')
  }

  return (
    <Paper elevation={5} className={classes.root}>
      <Box display="flex" alignItems="center" position="relative">
        <Avatar className={classes.avatar}>{username.charAt(0).toUpperCase()}</Avatar>
        <Typography component="h3" variant="h6">
          {username}
        </Typography>
        {deleteBtn && (
          <i
            onClick={() => {
              setIsDeleting(true)
              onRequestDeletePostClick(postID)
            }}
            className={classes.deletePostIcon}
          >
            <HighlightOffIcon color={isDeleting ? 'disabled' : 'action'} />
          </i>
        )}
      </Box>
      <Box className={classes.imageContainer}>
        <img
          alt=""
          style={{
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
            maxHeight: '600px',
          }}
          src={image_url}
        />
      </Box>
      <Typography>{description}</Typography>
      <Box className={classes.commentsContainer}>{children}</Box>
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
