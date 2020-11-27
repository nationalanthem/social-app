import { AxiosResponse } from 'axios'
import React from 'react'
import { IGetPostsResponse } from '../api/post.api'
import { IPost } from '../redux/re-ducks/types'

export const usePosts = (
  page: number,
  method: (page: number) => Promise<AxiosResponse<IGetPostsResponse>>
) => {
  const [loading, setLoading] = React.useState(false)
  const [posts, setPosts] = React.useState<IPost[]>([])
  const [hasNextPage, setHasNextPage] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    method(page).then((res) => {
      setPosts((prevPosts) => [...prevPosts, ...res.data.posts])
      setHasNextPage(res.data.currentPage < res.data.totalPages)
      setLoading(false)
    })
  }, [method, page])

  return { posts, loading, hasNextPage }
}
