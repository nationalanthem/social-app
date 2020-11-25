import React from 'react'
import { postAPI } from '../api/post.api'
import { IPost } from '../redux/re-ducks/types'

const usePosts = (page: number) => {
  const [loading, setLoading] = React.useState(false)
  const [posts, setPosts] = React.useState<IPost[]>([])
  const [hasNextPage, setHasNextPage] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    postAPI.fetchPosts(page).then((res) => {
      setPosts((prevPosts) => [...prevPosts, ...res.data.posts])
      setHasNextPage(res.data.currentPage < res.data.totalPages)
      setLoading(false)
    })
  }, [page])

  return { posts, loading, hasNextPage }
}

export default usePosts
