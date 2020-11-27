import { combineReducers } from 'redux'
import userReducer from './re-ducks/user/reducer'
import myPostsReducer from './re-ducks/myPosts/reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  myPosts: myPostsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
