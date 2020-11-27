import React from 'react'
import { Switch, makeStyles } from '@material-ui/core'
import SunOff from '@material-ui/icons/WbSunnyOutlined'
import SunOn from '@material-ui/icons/WbSunny'
import MoonOff from '@material-ui/icons/Brightness2Outlined'
import MoonOn from '@material-ui/icons/Brightness2'
import { CustomThemeContext } from '../ThemeProvider'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

export const ThemeSwitcher = () => {
  const { nightMode, toggleNightMode } = React.useContext(CustomThemeContext)
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      {!nightMode ? <SunOn fontSize="small" /> : <SunOff fontSize="small" />}
      <Switch checked={nightMode} color="primary" onChange={toggleNightMode} />
      {nightMode ? <MoonOn fontSize="small" /> : <MoonOff fontSize="small" />}
    </div>
  )
}
