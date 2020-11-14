import { User } from '../../user/@types'

// actions
export enum ActionTypes {
  FETCH_POSTS_START = 'posts/FETCH_POSTS_START',
  FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS',
  FETCH_MY_POSTS_SUCCESS = 'posts/FETCH_MY_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE',
}

export interface FetchPostsStart {
  type: typeof ActionTypes.FETCH_POSTS_START
}

export interface FetchPostsSuccess {
  type: typeof ActionTypes.FETCH_POSTS_SUCCESS
  payload: Post[]
}

export interface FetchMyPostsSuccess {
  type: typeof ActionTypes.FETCH_MY_POSTS_SUCCESS
  payload: Post[]
}

export interface FetchPostsFailure {
  type: typeof ActionTypes.FETCH_POSTS_FAILURE
  payload: string
}

export type Actions = FetchPostsStart | FetchPostsSuccess | FetchPostsFailure | FetchMyPostsSuccess

// state
export interface Post {
  _id: string
  description: string
  image: string
  author: User
}

export enum LoadingState {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  IDLE = 'IDLE',
}
