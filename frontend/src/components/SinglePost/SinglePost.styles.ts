import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(13),
    },
  },
  imgContainer: {
    height: 'auto',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },

  postHeader: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
  deleteIcon: {
    margin: 'auto',
  },

  img: {
    maxWidth: '100%',
    maxHeight: '80vh',
  },
  username: {
    marginLeft: theme.spacing(2),
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:active': {
      opacity: 0.5,
    },
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
  timestamp: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  addCommentForm: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  submitBtn: {
    padding: '0 2em',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      width: '100%',
      height: 50,
    },
  },
}))
