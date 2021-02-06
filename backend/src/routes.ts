import path from 'path'

import express, { Application } from 'express'
import { PassportStatic } from 'passport'

import { userController } from './controllers/User.controller'
import { registerValidation } from './validations/register.validation'
import { postController } from './controllers/Post.controller'
import { postValidation } from './validations/post.validation'
import { commentValidation } from './validations/comment.validation'

export function initRoutes(app: Application, passport: PassportStatic) {
  app.get('/me', passport.authenticate('jwt', { session: false }), userController.ownProfile)
  app.post('/register', registerValidation, userController.register)
  app.post('/login', userController.login)
  app.post(
    '/me/changeAvatar',
    passport.authenticate('jwt', { session: false }),
    userController.changeAvatar
  )
  app.get(
    '/search/users/:username',
    passport.authenticate('jwt', { session: false }),
    userController.getUsersByName
  )
  app.get(
    '/users/:userID',
    passport.authenticate('jwt', { session: false }),
    userController.getUserById
  )
  app.put('/follow', passport.authenticate('jwt', { session: false }), userController.followUser)
  app.put(
    '/unfollow',
    passport.authenticate('jwt', { session: false }),
    userController.unfollowUser
  )

  app.post(
    '/createPost',
    postValidation,
    passport.authenticate('jwt', { session: false }),
    postController.createPost
  )
  app.get('/posts', passport.authenticate('jwt', { session: false }), postController.getPosts)
  app.get('/posts/my', passport.authenticate('jwt', { session: false }), postController.getMyPosts)
  app.get(
    '/posts/followings',
    passport.authenticate('jwt', { session: false }),
    postController.getFollowingsPosts
  )
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

  app.put(
    '/addComment',
    commentValidation,
    passport.authenticate('jwt', { session: false }),
    postController.addComment
  )
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

  if (process.env.NODE_ENV === 'production') {
    const CLIENT_ROOT = path.join(__dirname, '..', 'frontend', 'build')
    app.use(express.static(CLIENT_ROOT))
    app.get('*', (_, res) => res.sendFile('index.html', { root: CLIENT_ROOT }))
  }
}
