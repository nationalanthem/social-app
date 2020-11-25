import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { Box, Typography, Grid, makeStyles, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
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
    '&:active': {
      opacity: 0.5,
    },
  },
  delete: {
    opacity: 0.25,
  },
}))

interface CommentProps {
  onRequestDeleteCommentClick: (commentID: string) => void
  authorUsername: string
  authorID: string
  commentBody: string
  commentID: string
  isUser: boolean
}

export const Comment: React.FC<CommentProps> = ({
  onRequestDeleteCommentClick,
  commentID,
  authorID,
  authorUsername,
  commentBody,
  isUser,
}) => {
  const classes = useStyles()

  const [isDeleting, setIsDeleting] = React.useState(false)

  return (
    <Box className={isDeleting ? classes.delete : undefined}>
      <Box className={classes.commentWrapper}>
        <Typography variant="body2" component="span" className={classes.commentUsername}>
          <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
            {authorUsername}
          </Link>
        </Typography>
        <Grid item xs={10} sm={11}>
          <Typography variant="body2" component="span">
            {commentBody}
          </Typography>
        </Grid>
        {isUser && (
          <IconButton
            onClick={() => {
              setIsDeleting(true)
              onRequestDeleteCommentClick(commentID)
            }}
            className={classes.deleteCommentIcon}
            size="small"
            disabled={isDeleting}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}
