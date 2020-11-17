import { IFetchUserFailure, IFetchUserStart, IFetchUserSuccess, IUser } from '../types'

export enum UserActionTypes {
  FETCH_USER_START = 'user/FETCH_USER_START',
  FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'user/FETCH_USER_FAILURE',
}

export const startFetch = (): IFetchUserStart => {
  return {
    type: UserActionTypes.FETCH_USER_START,
  }
}

export const successFetch = (payload: IUser): IFetchUserSuccess => {
  return {
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload,
  }
}

export const failureFetch = (payload: string): IFetchUserFailure => {
  return {
    type: UserActionTypes.FETCH_USER_FAILURE,
    payload,
  }
}
