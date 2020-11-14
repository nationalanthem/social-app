import { ActionTypes, FetchUserFailure, FetchUserStart, FetchUserSuccess, User } from './@types'

const startFetch = (): FetchUserStart => {
  return {
    type: ActionTypes.FETCH_USER_START,
  }
}

const successFetch = (payload: User): FetchUserSuccess => {
  return {
    type: ActionTypes.FETCH_USER_SUCCESS,
    payload,
  }
}

const failureFetch = (payload: string): FetchUserFailure => {
  return {
    type: ActionTypes.FETCH_USER_FAILURE,
    payload,
  }
}

export { startFetch, successFetch, failureFetch }
