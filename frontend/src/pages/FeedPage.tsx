import { Container } from '@material-ui/core'
import React from 'react'
import { IPost, postAPI } from '../api/post.api'
import Post from '../Post'

const FeedPage = () => {
  const [postsData, setPostsData] = React.useState<IPost[] | null>(null)

  React.useEffect(() => {
    postAPI
      .fetchPosts()
      .then((res) => {
        setPostsData(res.data.data)
      })
      .catch((err) => {
        alert('Ошибка при загрузке данных')
        console.log(err.response)
      })
  }, [])

  return (
    <Container maxWidth="md">
      {postsData ? (
        postsData.map((post) => (
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
