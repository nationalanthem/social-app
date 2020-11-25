import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { Typography, Box, IconButton, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
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
  deleteCommentIcon: {
    position: 'absolute',
    top: 0,
    right: -30,
    cursor: 'pointer',
    '&:active': {
      opacity: 0.5,
    },
  },
  deleted: {
    opacity: 0.25,
  },
}))

interface NewCommentProps {
  onRequestDeleteCommentClick: () => void
  username: string
  commentBody: string
}

export const NewComment: React.FC<NewCommentProps> = ({
  onRequestDeleteCommentClick,
  username,
  commentBody,
}) => {
  const classes = useStyles()

  const [isDeleting, setIsDeleting] = React.useState(false)

  return (
    <>
      <Box mb={2} className={isDeleting ? classes.deleted : undefined}>
        <Box className={classes.commentBody}>
          <Typography variant="body2" component="h3" className={classes.commentUsername}>
            <Link className={classes.link} to={'/profile'}>
              {username}
            </Link>
          </Typography>
          <Typography variant="body2" component="span">
            {commentBody}
          </Typography>

          <IconButton
            onClick={() => {
              setIsDeleting(true)
              onRequestDeleteCommentClick()
            }}
            className={classes.deleteCommentIcon}
            size="small"
          >
            {isDeleting ? null : <ClearIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
