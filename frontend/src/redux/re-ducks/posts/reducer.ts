import { produce, Draft } from 'immer'
import { Actions, ActionTypes, LoadingState, Post } from './@types'

export interface PostsState {
  posts: Post[]
  loading: LoadingState
  error: string | null
  myPosts: Post[]
}

const initialState: PostsState = {
  posts: [],
  loading: LoadingState.IDLE,
  error: null,
  myPosts: [],
}

export const rootReducer = produce((draft: Draft<PostsState>, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS_START:
      draft.loading = LoadingState.LOADING
      break
    case ActionTypes.FETCH_POSTS_SUCCESS:
      draft.loading = LoadingState.SUCCESS
      draft.error = null
      draft.posts = action.payload
      break
    case ActionTypes.FETCH_MY_POSTS_SUCCESS:
      draft.loading = LoadingState.SUCCESS
      draft.error = null
      draft.myPosts = action.payload
      break
    case ActionTypes.FETCH_POSTS_FAILURE:
      draft.loading = LoadingState.FAILURE
      draft.error = action.payload
      break
  }
}, initialState)
