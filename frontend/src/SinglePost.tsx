import {
  Box,
  Container,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(13),
    },
  },
  imgContainer: {
    [theme.breakpoints.up('md')]: {
      height: '750px',
    },
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(53,53,53)',
  },
  postHeader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  img: {
    maxWidth: '100%',
  },
  username: {
    paddingLeft: theme.spacing(2),
  },
  bodyContainer: {
    marginTop: '-7px',
    overflowX: 'hidden',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      height: '385px',
    },
    [theme.breakpoints.up('md')]: {
      height: '629px',
    },
  },
  descriptionContainer: {
    overflowWrap: 'break-word',
    paddingLeft: '0.5em',
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  commentWrapper: {
    overflowWrap: 'break-word',
    position: 'relative',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  commentUsername: {
    fontWeight: 'bolder',
    marginRight: '10px',
    float: 'left',
  },
  deleteCommentIcon: {
    position: 'absolute',
    top: 0,
    right: 10,
    transition: '0.1s all',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
    '&:active': {
      top: '2px',
    },
  },
  deletePostIcon: {
    position: 'absolute',
    top: 18,
    right: 10,
    transition: '0.1s all',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
    '&:active': {
      top: 20,
    },
  },
  addCommentForm: {
    display: 'flex',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  submitBtn: {
    padding: '0 2em',
  },
}))

interface CommentProps {
  onRequestDeleteCommentClick: (commentID: string) => void
  authorUsername: string
  commentBody: string
  commentID: string
  deleteBtn: boolean
}

export const Comment: React.FC<CommentProps> = ({
  onRequestDeleteCommentClick,
  commentID,
  authorUsername,
  commentBody,
  deleteBtn,
}) => {
  const classes = useStyles()

  const [isDeleting, setIsDeleting] = React.useState(false)

  return (
    <Box className={classes.commentWrapper}>
      <Typography variant="body2" component="span" className={classes.commentUsername}>
        {authorUsername}
      </Typography>
      <Grid item xs={10} sm={11}>
        <Typography variant="body2" component="span">
          {commentBody}
        </Typography>
      </Grid>
      {deleteBtn && (
        <i
          onClick={() => {
            setIsDeleting(true)
            onRequestDeleteCommentClick(commentID)
          }}
          className={classes.deleteCommentIcon}
        >
          {isDeleting ? <DeleteForeverIcon /> : <DeleteIcon />}
        </i>
      )}
    </Box>
  )
}

interface PostProps {
  children: React.ReactNode
  onRequestAddCommentClick: (body: string, divRev: React.RefObject<HTMLDivElement>) => void
  onRequestDeletePostClick: () => void
  username: string
  deleteBtn: boolean
  image_url: string
  description: string
}

export const Post: React.FC<PostProps> = ({
  onRequestAddCommentClick,
  onRequestDeletePostClick,
  username,
  image_url,
  description,
  deleteBtn,
  children,
}) => {
  const classes = useStyles()
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [commentBody, setCommentBody] = React.useState('')
  const divRef = React.useRef<HTMLDivElement>(null)

  const handleCommentBodyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCommentBody(e.target.value)
  }

  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!commentBody) return
    onRequestAddCommentClick(commentBody, divRef)
    setCommentBody('')
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={8}>
        <Grid container>
          <Grid item md={6} xs={12} className={classes.imgContainer}>
            <img
              alt={`Публикация пользователя ${username}`}
              src={image_url}
              className={classes.img}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.postHeader}>
              <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
              <Typography variant="h6" component="h2" className={classes.username}>
                {username}
              </Typography>
              {deleteBtn && (
                <i
                  title="Удалить"
                  onClick={() => {
                    setIsDeleting(true)
                    onRequestDeletePostClick()
                  }}
                  className={classes.deletePostIcon}
                >
                  <HighlightOffIcon color={isDeleting ? 'disabled' : 'action'} />
                </i>
              )}
            </div>
            <hr />
            <div ref={divRef} className={classes.bodyContainer}>
              <div className={classes.descriptionContainer}>
                <Typography variant="body1" component="span">
                  {description}
                </Typography>
              </div>

              {children}
            </div>
            <Box className={classes.addCommentForm}>
              <TextField
                onChange={handleCommentBodyChange}
                value={commentBody}
                type="text"
                label="Добавьте комментарий..."
                fullWidth
                variant="outlined"
                size="small"
              />
              <Button
                disabled={!commentBody}
                onClick={handleCommentSubmit}
                className={classes.submitBtn}
              >
                Добавить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
