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
              <Typography className={classes.timestamp} variant="body2">
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
