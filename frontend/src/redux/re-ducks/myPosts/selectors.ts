import { RootState } from '../../rootReducer'
import { LoadingState } from '../types'

export const selectMyPosts = (state: RootState) => state.myPosts.posts
export const selectIfMyPostsLoaded = (state: RootState) =>
  state.myPosts.loadingState === LoadingState.LOADED
