import { RootState } from '../../rootReducer'
import { LoadingState } from '../types'

export const selectTotalPages = (state: RootState) => state.posts.totalPages
export const selectCurrentPage = (state: RootState) => state.posts.currentPage

export const selectPosts = (state: RootState) => state.posts.posts
export const selectIfPostsLoaded = (state: RootState) =>
  state.posts.postsLoadingState === LoadingState.LOADED

export const selectMyPosts = (state: RootState) => state.posts.myPosts
export const selectIfMyPostsLoaded = (state: RootState) =>
  state.posts.myPostsLoadingState === LoadingState.LOADED

export const selectIfRestPostsLoading = (state: RootState) =>
  state.posts.restPostsLoadingState === LoadingState.LOADING
