import { combineReducers } from 'redux'
import userReducer from './re-ducks/user'
import postsReducer from './re-ducks/posts/reducer'

export const rootReducer = combineReducers({ user: userReducer, posts: postsReducer })

export type RootState = ReturnType<typeof rootReducer>
