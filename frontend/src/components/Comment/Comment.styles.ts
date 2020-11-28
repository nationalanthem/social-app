import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
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
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  commentUsername: {
    fontWeight: 'bolder',
    marginRight: 10,
    float: 'left',
  },
  deleteCommentIcon: {
    position: 'absolute',
    top: 0,
    right: -25,
    cursor: 'pointer',
    '&:active': {
      opacity: 0.5,
    },
  },
  deleted: {
    opacity: 0.25,
  },
}))
