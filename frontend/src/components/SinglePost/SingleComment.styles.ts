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
