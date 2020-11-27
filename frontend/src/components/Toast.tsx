import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

interface ToastProps {
  severity: 'error' | 'warning' | 'info' | 'success'
  message: string
  duration: number | null
  closeBtn: boolean
}

const Toast: React.FC<ToastProps> = ({ severity, message, duration, closeBtn }) => {
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert
          onClose={closeBtn ? handleClose : undefined}
          severity={severity}
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Toast
