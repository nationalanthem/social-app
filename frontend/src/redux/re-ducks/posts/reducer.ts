import produce, { Draft } from 'immer'
import { IPostsActions, IPostsState, LoadingState } from '../types'
import { PostsActionTypes } from './actions'

const initialState: IPostsState = {
  totalPages: null,
  currentPage: null,
  posts: [],
  postsLoadingState: LoadingState.IDLE,
  restPostsLoadingState: LoadingState.IDLE,
  myPosts: [],
  myPostsLoadingState: LoadingState.IDLE,
  postsError: null,
  restPostsError: null,
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
    case PostsActionTypes.FETCH_REST_POSTS_START:
      draft.restPostsLoadingState = LoadingState.LOADING
      break
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      draft.postsLoadingState = LoadingState.LOADED
      draft.postsError = null
      draft.totalPages = action.payload.totalPages
      draft.currentPage = action.payload.currentPage
      draft.posts = action.payload.posts
      break
    case PostsActionTypes.FETCH_REST_POSTS_SUCCESS:
      draft.restPostsLoadingState = LoadingState.LOADED
      draft.restPostsError = null
      draft.totalPages = action.payload.totalPages
      draft.currentPage = action.payload.currentPage
      draft.posts = [...draft.posts, ...action.payload.posts]
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
    case PostsActionTypes.FETCH_REST_POSTS_FAILURE:
      draft.restPostsLoadingState = LoadingState.IDLE
      draft.restPostsError = action.payload
      break
    case PostsActionTypes.FETCH_MY_POSTS_FAILURE:
      draft.myPostsLoadingState = LoadingState.IDLE
      draft.myPostsError = action.payload
      break
  }
}, initialState)

export default postsReducer
