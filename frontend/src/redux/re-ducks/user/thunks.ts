import { Dispatch } from 'redux'
import { userAPI } from '../../../api/user.api'
import { IUserActions } from '../types'
import { failureFetch, startFetch, successFetch } from './actions'

export const fetchUser = () => async (dispatch: Dispatch<IUserActions>) => {
  try {
    dispatch(startFetch())

    const response = await userAPI.myProfile()

    dispatch(successFetch(response.data.data))
  } catch (err) {
    dispatch(failureFetch('Не удалось загрузить пользователя'))
  }
}
