import { Container } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post'
import { fetchPosts } from '../redux/re-ducks/posts'
import { selectPosts } from '../redux/re-ducks/posts/selectors'

const FeedPage = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)

  React.useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <Container maxWidth="md">
      {posts ? (
        posts.map((post) => (
          <Post
            key={post._id}
            username={post.author.username}
            image_url={post.image}
            description={post.description}
          />
        ))
      ) : (
        <h1>Загрузка...</h1>
      )}
    </Container>
  )
}

export default FeedPage
