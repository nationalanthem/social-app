import produce, { Draft } from 'immer'
import { IPostsActions, IPostsState } from '../types'
import { PostsActionTypes } from './actions'

const initialState: IPostsState = {
  posts: [],
  loading: false,
  error: null,
  myPosts: [],
}

const postsReducer = produce((draft: Draft<IPostsState>, action: IPostsActions) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_START:
      draft.loading = true
      break
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      draft.loading = false
      draft.error = null
      draft.posts = action.payload
      break
    case PostsActionTypes.FETCH_MY_POSTS_SUCCESS:
      draft.loading = false
      draft.error = null
      draft.myPosts = action.payload
      break
    case PostsActionTypes.FETCH_POSTS_FAILURE:
      draft.loading = false
      draft.error = action.payload
      break
  }
}, initialState)

export default postsReducer
