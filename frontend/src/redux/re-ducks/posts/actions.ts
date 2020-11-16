import {
  IFetchMyPostsSuccess,
  IFetchPostsFailure,
  IFetchPostsStart,
  IFetchPostsSuccess,
  IPost,
} from '../types'

export enum ActionTypes {
  FETCH_POSTS_START = 'posts/FETCH_POSTS_START',
  FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS',
  FETCH_MY_POSTS_SUCCESS = 'posts/FETCH_MY_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE',
}

export const startFetch = (): IFetchPostsStart => {
  return {
    type: ActionTypes.FETCH_POSTS_START,
  }
}

export const successFetch = (payload: IPost[]): IFetchPostsSuccess => {
  return {
    type: ActionTypes.FETCH_POSTS_SUCCESS,
    payload,
  }
}

export const successFetchMyPosts = (payload: IPost[]): IFetchMyPostsSuccess => {
  return {
    type: ActionTypes.FETCH_MY_POSTS_SUCCESS,
    payload,
  }
}

export const failureFetch = (payload: string): IFetchPostsFailure => {
  return {
    type: ActionTypes.FETCH_POSTS_FAILURE,
    payload,
  }
}
