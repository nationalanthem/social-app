import {
  ActionTypes,
  FetchPostsFailure,
  FetchPostsStart,
  FetchPostsSuccess,
  FetchMyPostsSuccess,
  Post,
} from './@types'

const startFetch = (): FetchPostsStart => {
  return {
    type: ActionTypes.FETCH_POSTS_START,
  }
}

const successFetch = (payload: Post[]): FetchPostsSuccess => {
  return {
    type: ActionTypes.FETCH_POSTS_SUCCESS,
    payload,
  }
}

const successFetchMyPosts = (payload: Post[]): FetchMyPostsSuccess => {
  return {
    type: ActionTypes.FETCH_MY_POSTS_SUCCESS,
    payload,
  }
}

const failureFetch = (payload: string): FetchPostsFailure => {
  return {
    type: ActionTypes.FETCH_POSTS_FAILURE,
    payload,
  }
}

export { startFetch, successFetch, successFetchMyPosts, failureFetch }
