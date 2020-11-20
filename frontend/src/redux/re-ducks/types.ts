import { PostsActionTypes } from './posts/actions'
import { UserActionTypes } from './user/actions'

// POSTS
export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface IFetchPostsStart {
  type: typeof PostsActionTypes.FETCH_POSTS_START
}

export interface IFetchMyPostsStart {
  type: typeof PostsActionTypes.FETCH_MY_POSTS_START
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

export interface IFetchMyPostsFailure {
  type: typeof PostsActionTypes.FETCH_MY_POSTS_FAILURE
  payload: string
}

export type IPostsActions =
  | IFetchPostsStart
  | IFetchMyPostsStart
  | IFetchPostsSuccess
  | IFetchMyPostsSuccess
  | IFetchPostsFailure
  | IFetchMyPostsFailure

export interface IComment {
  _id: string
  body: string
  author: IUserPopulated
}

export interface IPost {
  _id: string
  description: string
  image: string
  author: IUserPopulated
  comments: IComment[]
}

export interface IPostsState {
  posts: IPost[]
  postsLoadingState: LoadingState
  myPosts: IPost[]
  myPostsLoadingState: LoadingState
  postsError: string | null
  myPostsError: string | null
}

// USER

export interface IFetchUserStart {
  type: typeof UserActionTypes.FETCH_USER_START
}

export interface IFetchUserSuccess {
  type: typeof UserActionTypes.FETCH_USER_SUCCESS
  payload: IUserPopulated
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

export interface IUserPopulated {
  _id: string
  username: string
  followers: IUser[]
  followings: IUser[]
}

export interface IUserState {
  user: IUserPopulated | null
  loading: boolean
  error: string | null
}
