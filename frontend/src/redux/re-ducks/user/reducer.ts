import produce, { Draft } from 'immer'
import { IUserActions, IUserState } from '../types'
import { UserActionTypes } from './actions'

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
}
const userReducer = produce((draft: Draft<IUserState>, action: IUserActions) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_START:
      draft.loading = true
      break
    case UserActionTypes.FETCH_USER_SUCCESS:
      draft.loading = false
      draft.error = null
      draft.user = action.payload
      break
    case UserActionTypes.FETCH_USER_FAILURE:
      draft.loading = false
      draft.error = action.payload
      break
  }
}, initialState)

export default userReducer
