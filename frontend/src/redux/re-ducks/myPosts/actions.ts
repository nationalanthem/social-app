import { IFetchMyPostsFailure, IFetchMyPostsStart, IFetchMyPostsSuccess, IPost } from '../types'

export enum MyPostsActionTypes {
  FETCH_ITEMS_START = 'myPosts/FETCH_ITEMS_START',
  FETCH_ITEMS_SUCCESS = 'myPosts/FETCH_ITEMS_SUCCESS',
  FETCH_ITEMS_FAILURE = 'myPosts/FETCH_ITEMS_FAILURE',
}

export const startFetchMyPosts = (): IFetchMyPostsStart => {
  return {
    type: MyPostsActionTypes.FETCH_ITEMS_START,
  }
}

export const successFetchMyPosts = (payload: IPost[]): IFetchMyPostsSuccess => {
  return {
    type: MyPostsActionTypes.FETCH_ITEMS_SUCCESS,
    payload,
  }
}

export const failureFetchMyPosts = (payload: string): IFetchMyPostsFailure => {
  return {
    type: MyPostsActionTypes.FETCH_ITEMS_FAILURE,
    payload,
  }
}
