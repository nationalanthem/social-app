import { RootState } from '../../rootReducer'

export const selectPosts = (state: RootState) => state.posts.posts
export const selectMyPosts = (state: RootState) => state.posts.myPosts
export const selectIfPostsLoaded = (state: RootState) => state.posts.loading === false
