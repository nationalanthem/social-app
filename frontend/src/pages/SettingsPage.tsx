import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { ThemeSwitcher } from '../components/ThemeSwitcher'

const useStyles = makeStyles((theme) => ({
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const OptionsPage = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <div className={classes.option}>
        <Typography>Ночной режим</Typography>
        <ThemeSwitcher />
      </div>
    </Container>
  )
}

export default OptionsPage
