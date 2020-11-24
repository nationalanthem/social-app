import { Dispatch } from 'redux'
import { postAPI } from '../../../api/post.api'
import { IPostsActions } from '../types'
import {
  failureFetch,
  failureFetchMyPosts,
  failureFetchRestPosts,
  startFetch,
  startFetchMyPosts,
  startFetchRestPosts,
  successFetch,
  successFetchMyPosts,
  successFetchRestPosts,
} from './actions'

export const fetchRecentPosts = () => async (dispatch: Dispatch<IPostsActions>) => {
  try {
    dispatch(startFetch())

    const response = await postAPI.fetchPosts()

    const totalPages = response.data.totalPages
    const currentPage = response.data.currentPage
    const posts = response.data.posts

    dispatch(successFetch({ totalPages, currentPage, posts }))
  } catch (err) {
    dispatch(failureFetch('Ошибка при загрузке данных'))
  }
}

export const fetchRestPosts = (page: number) => async (dispatch: Dispatch<IPostsActions>) => {
  try {
    dispatch(startFetchRestPosts())

    const response = await postAPI.fetchPosts(page)
    
    const totalPages = response.data.totalPages
    const currentPage = response.data.currentPage
    const posts = response.data.posts

    dispatch(successFetchRestPosts({ totalPages, currentPage, posts }))
  } catch (err) {
    dispatch(failureFetchRestPosts('Ошибка при загрузке данных'))
  }
}

export const fetchOnlyMyPosts = () => async (dispatch: Dispatch<IPostsActions>) => {
  try {
    dispatch(startFetchMyPosts())

    const response = await postAPI.getMyPosts()

    dispatch(successFetchMyPosts(response.data.data))
  } catch (err) {
    dispatch(failureFetchMyPosts('Ошибка при загрузке данных'))
  }
}
