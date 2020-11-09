import { Container } from '@material-ui/core'
import React from 'react'
import Post from '../Post'

const FeedPage = () => {
  return (
    <Container maxWidth="md">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  )
}

export default FeedPage
