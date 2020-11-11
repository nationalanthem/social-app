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

app.post(
  '/createPost',
  postValidation,
  passport.authenticate('jwt', { session: false }),
  postController.createPost
)
app.get('/posts', postController.getAllPosts)
app.get('/posts/my', passport.authenticate('jwt', { session: false }), postController.getMyPosts)

connectToDB()
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})
