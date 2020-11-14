import { Paper, Typography, Avatar, Box, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
    height: '600px',
    margin: '1.5em 0',
  },
  commentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1em 0',
  },
  commentBody: {
    display: 'flex',
    alignItems: 'baseline',
  },
  commentUsername: {
    fontWeight: 'bolder',
    marginRight: theme.spacing(2),
  },
  addCommentForm: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  submit: {
    marginLeft: theme.spacing(2),
  },
}))

const Comment = () => {
  const classes = useStyles()

  return (
    <>
      <Box mb={2}>
        <Box className={classes.commentBody}>
          <Typography variant="body2" className={classes.commentUsername}>
            Username
          </Typography>
          <Typography variant="body2">Комментарий...</Typography>
        </Box>
      </Box>
    </>
  )
}

interface IPostProps {
  username: string
  image_url: string
  description: string
}

const Post: React.FC<IPostProps> = ({ username, image_url, description }) => {
  const classes = useStyles()

  return (
    <Paper elevation={5} className={classes.root}>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar}>{username.charAt(0).toUpperCase()}</Avatar>
        <Typography component="h3" variant="h6">
          {username}
        </Typography>
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
      <Box className={classes.commentsContainer}>
        <Comment />
        <Comment />
        <Comment />
      </Box>
      <Box className={classes.addCommentForm}>
        <TextField type="text" label="Напишите комментарий" fullWidth />
        <Button className={classes.submit}>Добавить</Button>
      </Box>
    </Paper>
  )
}

export default Post
