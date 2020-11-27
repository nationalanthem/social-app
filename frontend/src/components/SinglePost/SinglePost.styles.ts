import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(13),
    },
  },
  imgContainer: {
    [theme.breakpoints.up('md')]: {
      height: '750px',
    },
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  postHeader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  img: {
    maxWidth: '100%',
    maxHeight: '80vh',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
  },
  username: {
    paddingLeft: theme.spacing(2),
  },
  bodyContainer: {
    marginTop: '-7px',
    overflowX: 'hidden',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      height: '385px',
    },
    [theme.breakpoints.up('md')]: {
      height: '629px',
    },
  },
  descriptionContainer: {
    overflowWrap: 'break-word',
    paddingLeft: '0.5em',
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  deletePostIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  timestamp: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  addCommentForm: {
    display: 'flex',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  submitBtn: {
    padding: '0 2em',
  },
}))
