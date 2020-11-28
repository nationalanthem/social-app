import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { Typography, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from '../Comment/Comment.styles'

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

  const handleDelete = () => {
    setIsDeleting(true)
    onRequestDeleteCommentClick()
  }

  return (
    <>
      <div className={isDeleting ? classes.deleted : undefined}>
        <div className={classes.commentWrapper}>
          <Typography variant="body2" className={classes.commentUsername}>
            <Link className={classes.link} to={'/profile'}>
              {username}
            </Link>
          </Typography>
          <Typography variant="body2">{commentBody}</Typography>

          <IconButton onClick={handleDelete} className={classes.deleteCommentIcon} size="small">
            {!isDeleting && <ClearIcon fontSize="small" />}
          </IconButton>
        </div>
      </div>
    </>
  )
}
