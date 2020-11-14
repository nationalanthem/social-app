import { Dispatch } from 'redux'
import { postAPI } from '../../../api/post.api'
import { Actions } from './@types'
import { failureFetch, startFetch, successFetch, successFetchMyPosts } from './actions'

export const fetchPosts = () => async (dispatch: Dispatch<Actions>) => {
  try {
    dispatch(startFetch())

    const response = await postAPI.fetchPosts()

    dispatch(successFetch(response.data.data))
  } catch (err) {
    dispatch(failureFetch('Ошибка при загрузке данных'))
  }
}

export const fetchOnlyMyPosts = () => async (dispatch: Dispatch<Actions>) => {
  try {
    dispatch(startFetch())

    const response = await postAPI.getMyPosts()

    dispatch(successFetchMyPosts(response.data.data))
  } catch (err) {
    dispatch(failureFetch('Ошибка при загрузке данных'))
  }
}
