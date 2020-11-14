import { produce, Draft } from 'immer'
import { Actions, ActionTypes, LoadingState, User } from './@types'

export interface UserState {
  user: User | null
  loading: LoadingState
  error: string | null
}

const initialState: UserState = {
  user: null,
  loading: LoadingState.IDLE,
  error: null,
}

export const rootReducer = produce((draft: Draft<UserState>, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_START:
      draft.loading = LoadingState.LOADING
      break
    case ActionTypes.FETCH_USER_SUCCESS:
      draft.loading = LoadingState.SUCCESS
      draft.error = null
      draft.user = action.payload
      break
    case ActionTypes.FETCH_USER_FAILURE:
      draft.loading = LoadingState.FAILURE
      draft.error = action.payload
      break
  }
}, initialState)
