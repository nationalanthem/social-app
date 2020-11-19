import produce, { Draft } from 'immer'
import { IPostsActions, IPostsState, LoadingState } from '../types'
import { PostsActionTypes } from './actions'

const initialState: IPostsState = {
  posts: [],
  postsLoadingState: LoadingState.IDLE,
  myPosts: [],
  myPostsLoadingState: LoadingState.IDLE,
  postsError: null,
  myPostsError: null,
}

const postsReducer = produce((draft: Draft<IPostsState>, action: IPostsActions) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_START:
      draft.postsLoadingState = LoadingState.LOADING
      break
    case PostsActionTypes.FETCH_MY_POSTS_START:
      draft.myPostsLoadingState = LoadingState.LOADING
      break
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      draft.postsLoadingState = LoadingState.LOADED
      draft.postsError = null
      draft.posts = action.payload
      break
    case PostsActionTypes.FETCH_MY_POSTS_SUCCESS:
      draft.myPostsLoadingState = LoadingState.LOADED
      draft.myPostsError = null
      draft.myPosts = action.payload
      break
    case PostsActionTypes.FETCH_POSTS_FAILURE:
      draft.postsLoadingState = LoadingState.IDLE
      draft.postsError = action.payload
      break
    case PostsActionTypes.FETCH_MY_POSTS_FAILURE:
      draft.myPostsLoadingState = LoadingState.IDLE
      draft.myPostsError = action.payload
      break
  }
}, initialState)

export default postsReducer
