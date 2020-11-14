// actions
export enum ActionTypes {
  FETCH_USER_START = 'user/FETCH_USER_START',
  FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'user/FETCH_USER_FAILURE',
}

export interface FetchUserStart {
  type: typeof ActionTypes.FETCH_USER_START
}

export interface FetchUserSuccess {
  type: typeof ActionTypes.FETCH_USER_SUCCESS
  payload: User
}

export interface FetchUserFailure {
  type: typeof ActionTypes.FETCH_USER_FAILURE
  payload: string
}

export type Actions = FetchUserStart | FetchUserSuccess | FetchUserFailure

// state
export interface User {
  _id: string
  username: string
}

export enum LoadingState {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  IDLE = 'IDLE',
}
