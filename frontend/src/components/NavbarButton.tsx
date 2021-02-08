import { IconButton, makeStyles, Tooltip } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  iconBox: {
    boxSizing: 'border-box',
    padding: '12px',
    width: 48,
    height: 48,
  },
}))

interface Props {
  path: string
  title: string
  iconButton: React.ReactNode
  icon: React.ReactNode
}

export const NavbarButton: React.FC<Props> = ({ path, title, iconButton, icon }) => {
  const classes = useStyles()
  const location = useLocation()

  return location.pathname !== path ? (
    <Tooltip title={title}>
      <IconButton component={Link} to={path}>
        {iconButton}
      </IconButton>
    </Tooltip>
  ) : (
    <div className={classes.iconBox}>{icon}</div>
  )
}
