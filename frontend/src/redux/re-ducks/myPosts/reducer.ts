import produce, { Draft } from 'immer'
import { IMyPostsActions, IPostsState, LoadingState } from '../types'
import { MyPostsActionTypes } from './actions'

const initialState: IPostsState = {
  posts: [],
  loadingState: LoadingState.IDLE,
  error: null,
}

const postsReducer = produce((draft: Draft<IPostsState>, action: IMyPostsActions) => {
  switch (action.type) {
    case MyPostsActionTypes.FETCH_ITEMS_START:
      draft.loadingState = LoadingState.LOADING
      break
    case MyPostsActionTypes.FETCH_ITEMS_SUCCESS:
      draft.loadingState = LoadingState.LOADED
      draft.error = null
      draft.posts = action.payload
      break
    case MyPostsActionTypes.FETCH_ITEMS_FAILURE:
      draft.loadingState = LoadingState.IDLE
      draft.error = action.payload
      break
  }
}, initialState)

export default postsReducer
