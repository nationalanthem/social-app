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
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  commentAvatar: {
    marginRight: theme.spacing(1),
  },
  addCommentForm: {
    display: 'flex',
    alignItems: 'baseline',
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
        <Box className={classes.commentHeader}>
          <Avatar className={classes.commentAvatar}>U</Avatar>
          <Typography>Username</Typography>
        </Box>
        <Typography variant="body2">Комментарий...</Typography>
      </Box>
    </>
  )
}

const Post = () => {
  const classes = useStyles()

  return (
    <Paper elevation={5} className={classes.root}>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar}>U</Avatar>
        <Typography component="h3" variant="h6">
          Username
        </Typography>
      </Box>
      <Box className={classes.imageContainer}>
        <img
          alt="animal"
          style={{
            maxWidth: '100%',
            maxHeight: '600px',
          }}
          src="https://images.unsplash.com/photo-1604864990572-993aae1ac5c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        />
      </Box>
      <Typography>Описание...</Typography>
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
