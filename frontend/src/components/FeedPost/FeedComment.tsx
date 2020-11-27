import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { Typography, Box, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { postAPI } from '../../api/post.api'
import { useStyles } from './FeedComment.styles'

interface CommentProps {
  authorUsername: string
  authorID: string
  commentBody: string
  postID: string
  commentID: string
  isUser: boolean
}

export const Comment: React.FC<CommentProps> = ({
  postID,
  authorID,
  commentID,
  authorUsername,
  commentBody,
  isUser,
}) => {
  const classes = useStyles()
  const [isDeleting, setIsDeleting] = React.useState(false)

  return (
    <>
      <Box mb={2} className={isDeleting ? classes.deleted : undefined}>
        <Box className={classes.commentBody}>
          <Typography variant="body2" component="h3" className={classes.commentUsername}>
            <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
              {authorUsername}
            </Link>
          </Typography>
          <Typography variant="body2" component="span">
            {commentBody}
          </Typography>
          {isUser && (
            <IconButton
              onClick={() => {
                setIsDeleting(true)
                postAPI.deleteComment(postID, commentID)
              }}
              className={classes.deleteCommentIcon}
              size="small"
            >
              {isDeleting ? null : <ClearIcon fontSize="small" />}
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  )
}
