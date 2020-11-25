import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'

interface PostOptionsProps {
  isAuthor?: boolean
  onDelete: () => void
  linkToPost: string
}

const PostOptions: React.FC<PostOptionsProps> = ({ isAuthor, onDelete, linkToPost }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const open = !!anchorEl

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setIsDeleting(true)
    handleClose()
    onDelete()
  }

  return (
    <div>
      <IconButton disabled={isDeleting} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem component={Link} to={linkToPost} onClick={handleClose}>
          Перейти к публикации
        </MenuItem>
        {isAuthor ? <MenuItem onClick={handleDeleteClick}>Удалить</MenuItem> : null}
      </Menu>
    </div>
  )
}

export default PostOptions
