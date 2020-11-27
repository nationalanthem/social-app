import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
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
