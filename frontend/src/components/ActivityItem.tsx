import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import { ru } from 'date-fns/locale'
import { formatDistance } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  listItem: {
    position: 'relative',
  },
  avatar: {
    '&:hover': {
      opacity: 0.7,
    },
    '&:active': {
      opacity: 0.4,
    },
  },
  postImage: {
    maxWidth: '48px',
    maxHeight: '48px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 15,
    '&:hover': {
      opacity: 0.7,
    },
    '&:active': {
      opacity: 0.4,
    },
  },
  timestamp: {
    marginRight: theme.spacing(2),
  },
}))

interface Props {
  activityType: string
  postID?: string
  postImage?: string
  postBody?: string
  userAvatar?: string
  userName: string
  userID: string
  timestamp: Date
}

const ActivityItem: React.FC<Props> = (props) => {
  const classes = useStyles()
  let activity

  switch (props.activityType) {
    case 'follow':
      activity = 'подписался(-ась) на ваши обновления'
      break
    case 'comment':
      activity = `прокомментировал(а) ваш пост`
      break
  }

  return (
    <>
      <ListItem className={classes.listItem} alignItems="flex-start">
        <Link to={`/u/${props.userID}`}>
          <ListItemAvatar className={classes.avatar}>
            <Avatar alt={`Аватар пользователя ${props.userName}`} src={props.userAvatar}>
              {props.userName.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
        </Link>
        <ListItemText
          primary={props.userName}
          secondary={
            <Typography component="span" variant="body2" color="textPrimary">
              {activity}
            </Typography>
          }
        />
        {props.postImage && (
          <Link to={`/p/${props.postID}`}>
            <img src={props.postImage} className={classes.postImage} alt={props.postBody} />
          </Link>
        )}
      </ListItem>
      <Typography className={classes.timestamp} align="right" variant="body2" color="textSecondary">
        {formatDistance(new Date(props.timestamp), Date.now(), {
          locale: ru,
          addSuffix: true,
        })}
      </Typography>
    </>
  )
}

export default ActivityItem
