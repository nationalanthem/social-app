import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { Typography, IconButton, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from './Comment.styles'
import { postAPI } from '../../api/post.api'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/re-ducks/user/effects'

interface CommentProps {
  onRequestDeleteCommentClick?: (
    commentID: string,
    isUser: boolean,
    isPostByAuthor?: boolean
  ) => void
  postID?: string
  authorUsername: string
  authorID: string
  commentBody: string
  commentID: string
  isUser: boolean
  isPostByAuthor?: boolean
}

export const Comment: React.FC<CommentProps> = ({
  onRequestDeleteCommentClick,
  postID,
  authorUsername,
  authorID,
  commentBody,
  commentID,
  isUser,
  isPostByAuthor,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = React.useState(false)

  const [comment, setComment] = React.useState(
    commentBody.length > 150 ? commentBody.slice(0, 150) + '...' : commentBody
  )
  const [revealed, setRevealed] = React.useState(commentBody.length < 150)

  const revealComment = () => {
    setRevealed(true)
    setComment(commentBody)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    if (onRequestDeleteCommentClick) {
      onRequestDeleteCommentClick(commentID, isUser, isPostByAuthor)
    } else {
      postAPI.deleteComment(postID!, commentID).then((_) => {
        if (isPostByAuthor && !isUser) dispatch(fetchUser())
      })
    }
  }

  return (
    <div className={isDeleting ? classes.deleted : undefined}>
      <div className={classes.commentWrapper}>
        <Typography variant="body2" className={classes.commentUsername}>
          <Link className={classes.link} to={isUser ? '/profile' : `/u/${authorID}`}>
            {authorUsername}
          </Link>
        </Typography>
        <Typography variant="body2">
          {comment}{' '}
          {!revealed && (
            <Button color="primary" onClick={revealComment} size="small">
              Показать полностью
            </Button>
          )}
        </Typography>
        {(isUser || isPostByAuthor) && (
          <IconButton
            onClick={handleDelete}
            className={classes.deleteCommentIcon}
            size="small"
            disabled={isDeleting}
          >
            {!isDeleting && <ClearIcon fontSize="small" />}
          </IconButton>
        )}
      </div>
    </div>
  )
}
