import { PostsActionTypes } from './posts/actions'
import { UserActionTypes } from './user/actions'

// POSTS

export interface IFetchPostsStart {
  type: typeof PostsActionTypes.FETCH_POSTS_START
}

export interface IFetchPostsSuccess {
  type: typeof PostsActionTypes.FETCH_POSTS_SUCCESS
  payload: IPost[]
}

export interface IFetchMyPostsSuccess {
  type: typeof PostsActionTypes.FETCH_MY_POSTS_SUCCESS
  payload: IPost[]
}

export interface IFetchPostsFailure {
  type: typeof PostsActionTypes.FETCH_POSTS_FAILURE
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
  author: IUser
}

export interface IPost {
  _id: string
  description: string
  image: string
  author: IUser
  comments: IComment[]
}

export interface IPostsState {
  posts: IPost[]
  loading: boolean
  error: string | null
  myPosts: IPost[]
}

// USER

export interface IFetchUserStart {
  type: typeof UserActionTypes.FETCH_USER_START
}

export interface IFetchUserSuccess {
  type: typeof UserActionTypes.FETCH_USER_SUCCESS
  payload: IUser
}

export interface IFetchUserFailure {
  type: typeof UserActionTypes.FETCH_USER_FAILURE
  payload: string
}

export type IUserActions = IFetchUserStart | IFetchUserSuccess | IFetchUserFailure

export interface IUser {
  _id: string
  username: string
}

export interface IUserState {
  user: IUser | null
  loading: boolean
  error: string | null
}
