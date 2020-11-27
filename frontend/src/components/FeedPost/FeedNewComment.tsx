import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { Typography, Box, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from './FeedNewComment.styles'

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