import { RootState } from '../../rootReducer'
import { LoadingState } from '../types'

export const selectPosts = (state: RootState) => state.posts.posts
export const selectIfPostsLoaded = (state: RootState) =>
  state.posts.postsLoadingState === LoadingState.LOADED

export const selectMyPosts = (state: RootState) => state.posts.myPosts
export const selectIfMyPostsLoaded = (state: RootState) =>
  state.posts.myPostsLoadingState === LoadingState.LOADED
