import { Dispatch } from 'redux'
import { postAPI } from '../../../api/post.api'
import { IMyPostsActions } from '../types'
import { failureFetchMyPosts, startFetchMyPosts, successFetchMyPosts } from './actions'

export const fetchMyPosts = () => async (dispatch: Dispatch<IMyPostsActions>) => {
  try {
    dispatch(startFetchMyPosts())

    const response = await postAPI.getMyPosts()

    dispatch(successFetchMyPosts(response.data.data))
  } catch (err) {
    dispatch(failureFetchMyPosts('Ошибка при загрузке данных'))
  }
}
