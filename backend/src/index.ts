import { config } from 'dotenv'
config()

import express from 'express'
import { connectToDB } from './database'
import { passport } from './passport'

import { userController } from './controllers/User.controller'
import { registerValidation } from './validations/register.validation'
import { postController } from './controllers/Post.controller'
import { postValidation } from './validations/post.validation'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(passport.initialize())

app.get('/me', passport.authenticate('jwt', { session: false }), userController.ownProfile)
app.post('/register', registerValidation, userController.register)
app.post('/login', userController.login)
app.get(
  '/users/:userID',
  passport.authenticate('jwt', { session: false }),
  userController.getUserById
)
app.put('/follow', passport.authenticate('jwt', { session: false }), userController.followUser)
app.put('/unfollow', passport.authenticate('jwt', { session: false }), userController.unfollowUser)

app.post(
  '/createPost',
  postValidation,
  passport.authenticate('jwt', { session: false }),
  postController.createPost
)
app.get('/posts', passport.authenticate('jwt', { session: false }), postController.getPosts)
app.get('/posts/my', passport.authenticate('jwt', { session: false }), postController.getMyPosts)
app.get(
  '/posts/:postID',
  passport.authenticate('jwt', { session: false }),
  postController.getPostById
)
app.get(
  '/posts/from/:userID',
  passport.authenticate('jwt', { session: false }),
  postController.getPostsFromUser
)

app.put('/addComment', passport.authenticate('jwt', { session: false }), postController.addComment)
app.delete(
  '/deleteComment/:postID/:commentID',
  passport.authenticate('jwt', { session: false }),
  postController.deleteComment
)
app.delete(
  '/deletePost/:postID',
  passport.authenticate('jwt', { session: false }),
  postController.deletePost
)

connectToDB()
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})
