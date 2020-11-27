import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  imageContainer: {
    margin: '1.5em -16px',
    maxHeight: '40vh',
    backgroundColor: theme.palette.background.default,
  },
  image: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    maxHeight: '40vh',
  },
  timestamp: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  description: {
    overflowWrap: 'break-word',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
  },
  commentsContainer: {
    marginTop: theme.spacing(2),
  },
  addCommentForm: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  submit: {
    marginLeft: theme.spacing(2),
  },
  deleted: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  },
  deletedImage: {
    filter: 'grayscale(100%)',
  },
}))
