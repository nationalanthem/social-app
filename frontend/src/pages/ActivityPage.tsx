import { Box, Container, CircularProgress, Typography, makeStyles, List } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import ActivityItem from '../components/ActivityItem'
import { selectUser } from '../redux/re-ducks/user/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
  },
}))

const ActivityPage = () => {
  const classes = useStyles()
  const user = useSelector(selectUser)

  if (!user) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="md">
      {!user.activity.length && <Typography align="center">Нет активности</Typography>}

      <List className={classes.root}>
        {user.activity.map((activity) => (
          <ActivityItem
            key={activity._id}
            activityType={activity.activityType}
            userID={activity.user._id}
            userName={activity.user.username}
            userAvatar={activity.user.avatar}
            postBody={activity.body}
            postID={activity.target?._id}
            postImage={activity.target?.image}
            timestamp={activity.timestamp}
          />
        ))}
      </List>
    </Container>
  )
}

export default ActivityPage
