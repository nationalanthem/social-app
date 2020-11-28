import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import { useStyles } from './SinglePost.styles'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import { ru } from 'date-fns/locale'
import { formatDistance } from 'date-fns'

interface PostProps {
  children: React.ReactNode
  onRequestAddCommentClick: (body: string, divRev: React.RefObject<HTMLDivElement>) => void
  onRequestDeletePostClick: () => void
  authorID: string
  authorUsername: string
  isUser: boolean
  image_url: string
  description: string
  timestamp: Date
}

export const Post: React.FC<PostProps> = ({
  onRequestAddCommentClick,
  onRequestDeletePostClick,
  authorID,
  authorUsername,
  image_url,
  description,
  isUser,
  timestamp,
  children,
}) => {
  const classes = useStyles()
  const [commentBody, setCommentBody] = React.useState('')
  const divRef = React.useRef<HTMLDivElement>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [unix, setUnix] = React.useState(Date.now())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setUnix(Date.now())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleCommentBodyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length > 1000) {
      e.target.value = e.target.value.slice(0, 1000)
    }
    setCommentBody(e.target.value)
  }

  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!commentBody) return
    onRequestAddCommentClick(commentBody, divRef)
    setCommentBody('')
  }

  const handleDeletePost = () => {
    setIsDeleting(true)
    onRequestDeletePostClick()
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
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Avatar>{authorUsername.charAt(0).toUpperCase()}</Avatar>
                <Typography className={classes.username} variant="h6" component="h2">
                  <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
                    {authorUsername}
                  </Link>
                </Typography>
              </Box>
              {isUser && (
                <Tooltip title="Удалить" arrow placement="left">
                  <IconButton
                    onClick={handleDeletePost}
                    disabled={isDeleting}
                    className={classes.deleteIcon}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>

            <hr />
            <div ref={divRef} className={classes.bodyContainer}>
              <Typography color="textSecondary" variant="body2">
                {formatDistance(new Date(timestamp), unix, {
                  locale: ru,
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </Typography>
              <div className={classes.descriptionContainer}>
                <Typography variant="body1" component="span">
                  {description}
                </Typography>
              </div>

              {children}
            </div>

            <Box className={classes.addCommentForm}>
              <Box flexGrow={1}>
                <TextField
                  onChange={handleCommentBodyChange}
                  value={commentBody}
                  type="text"
                  label="Добавьте комментарий..."
                  fullWidth
                  variant="outlined"
                  helperText={commentBody.length ? commentBody.length + ' / 1000' : null}
                  size="small"
                />
              </Box>
              <Button
                disabled={!commentBody}
                onClick={handleCommentSubmit}
                className={classes.submitBtn}
                size="large"
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
