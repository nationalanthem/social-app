import {
  IFetchMyPostsFailure,
  IFetchMyPostsStart,
  IFetchMyPostsSuccess,
  IFetchPostsFailure,
  IFetchPostsStart,
  IFetchPostsSuccess,
  IPost,
} from '../types'

export enum PostsActionTypes {
  FETCH_POSTS_START = 'posts/FETCH_POSTS_START',
  FETCH_MY_POSTS_START = 'posts/FETCH_MY_POSTS_START',
  FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS',
  FETCH_MY_POSTS_SUCCESS = 'posts/FETCH_MY_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE',
  FETCH_MY_POSTS_FAILURE = 'posts/FETCH_MY_POSTS_FAILURE',
}

export const startFetch = (): IFetchPostsStart => {
  return {
    type: PostsActionTypes.FETCH_POSTS_START,
  }
}

export const startFetchMyPosts = (): IFetchMyPostsStart => {
  return {
    type: PostsActionTypes.FETCH_MY_POSTS_START,
  }
}

export const successFetch = (payload: IPost[]): IFetchPostsSuccess => {
  return {
    type: PostsActionTypes.FETCH_POSTS_SUCCESS,
    payload,
  }
}

export const successFetchMyPosts = (payload: IPost[]): IFetchMyPostsSuccess => {
  return {
    type: PostsActionTypes.FETCH_MY_POSTS_SUCCESS,
    payload,
  }
}

export const failureFetch = (payload: string): IFetchPostsFailure => {
  return {
    type: PostsActionTypes.FETCH_POSTS_FAILURE,
    payload,
  }
}

export const failureFetchMyPosts = (payload: string): IFetchMyPostsFailure => {
  return {
    type: PostsActionTypes.FETCH_MY_POSTS_FAILURE,
    payload,
  }
}
