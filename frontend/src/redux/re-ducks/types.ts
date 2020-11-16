import { ActionTypes } from './posts/actions'
import { User } from './user/@types'

// POSTS

export interface IFetchPostsStart {
  type: typeof ActionTypes.FETCH_POSTS_START
}

export interface IFetchPostsSuccess {
  type: typeof ActionTypes.FETCH_POSTS_SUCCESS
  payload: IPost[]
}

export interface IFetchMyPostsSuccess {
  type: typeof ActionTypes.FETCH_MY_POSTS_SUCCESS
  payload: IPost[]
}

export interface IFetchPostsFailure {
  type: typeof ActionTypes.FETCH_POSTS_FAILURE
  payload: string
}

export type IPostsActions =
  | IFetchPostsStart
  | IFetchPostsSuccess
  | IFetchMyPostsSuccess
  | IFetchPostsFailure

export interface IComment {
  _id: string
  body: string
  author: User
}

export interface IPost {
  _id: string
  description: string
  image: string
  author: User
  comments: IComment[]
}

export interface IPostsState {
  posts: IPost[]
  loading: boolean
  error: string | null
  myPosts: IPost[]
}

// USER
