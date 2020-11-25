import { MyPostsActionTypes } from './myPosts/actions'
import { UserActionTypes } from './user/actions'

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

// MY POSTS
export interface IFetchMyPostsStart {
  type: typeof MyPostsActionTypes.FETCH_ITEMS_START
}
export interface IFetchMyPostsSuccess {
  type: typeof MyPostsActionTypes.FETCH_ITEMS_SUCCESS
  payload: IPost[]
}

export interface IFetchMyPostsFailure {
  type: typeof MyPostsActionTypes.FETCH_ITEMS_FAILURE
  payload: string
}

export type IMyPostsActions = IFetchMyPostsStart | IFetchMyPostsSuccess | IFetchMyPostsFailure

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
  createdAt: Date
}

export interface IPostsState {
  posts: IPost[]
  loadingState: LoadingState
  error: string | null
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
