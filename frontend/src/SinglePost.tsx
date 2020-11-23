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
  Tooltip,
  IconButton,
} from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'

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
    maxHeight: '80vh',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
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
  deletePostIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
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

interface PostProps {
  children: React.ReactNode
  onRequestAddCommentClick: (body: string, divRev: React.RefObject<HTMLDivElement>) => void
  onRequestDeletePostClick: () => void
  authorID: string
  authorUsername: string
  isUser: boolean
  image_url: string
  description: string
}

export const Post: React.FC<PostProps> = ({
  onRequestAddCommentClick,
  onRequestDeletePostClick,
  authorID,
  authorUsername,
  image_url,
  description,
  isUser,
  children,
}) => {
  const classes = useStyles()
  const [commentBody, setCommentBody] = React.useState('')
  const divRef = React.useRef<HTMLDivElement>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

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
              alt={`Публикация пользователя ${authorUsername}`}
              src={image_url}
              className={classes.img}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.postHeader}>
              <Avatar>{authorUsername.charAt(0).toUpperCase()}</Avatar>
              <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
                <Typography variant="h6" component="h2" className={classes.username}>
                  {authorUsername}
                </Typography>
              </Link>
              {isUser && (
                <Tooltip title="Удалить" arrow placement="left">
                  <IconButton
                    className={classes.deletePostIcon}
                    onClick={() => {
                      setIsDeleting(true)
                      onRequestDeletePostClick()
                    }}
                    disabled={isDeleting}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
