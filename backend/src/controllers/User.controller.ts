import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User, { IUser, UserSchemaWithDocument } from '../models/User.model'
import { passport } from '../passport'

class UserController {
  ownProfile(req: Request, res: Response): void {
    const user = req.user as IUser
    User.findById(user._id)
      .populate('followers followings', '_id username')
      .exec((error, data) => {
        if (error) return res.status(400).json({ error })
        res.json({ data })
      })
  }

  getUserById(req: Request, res: Response): void {
    const { userID } = req.params

    User.findById(userID)
      .populate('followers followings', '_id username')
      .exec((error, data) => {
        if (error) return res.status(404).json({ error: 'Такого пользователя не существует' })
        res.json({ data })
      })
  }

  followUser(req: Request, res: Response): void {
    const { userID } = req.body
    const user = req.user as IUser

    User.findById(userID, (error, userToFollow) => {
      if (error) return res.status(400).json({ error })
      if (!userToFollow) return res.sendStatus(404)
      if (userToFollow.followers.includes(user._id)) return res.sendStatus(409)

      userToFollow.updateOne({ $push: { followers: user._id } }).exec((error, _) => {
        if (error) return res.status(400).json({ error })
        User.findByIdAndUpdate(user._id, { $push: { followings: userID } }, (error, _) => {
          if (error) return res.status(400).json({ error })
          res.send()
        })
      })
    })
  }

  unfollowUser(req: Request, res: Response): void {
    const { userID } = req.body
    const user = req.user as IUser

    User.findById(userID, (error, userToUnfollow) => {
      if (error) return res.status(400).json({ error })
      if (!userToUnfollow) return res.sendStatus(404)
      if (!userToUnfollow.followers.includes(user._id)) return res.sendStatus(409)

      userToUnfollow.updateOne({ $pull: { followers: user._id } }).exec((error, _) => {
        if (error) return res.status(400).json({ error })
        User.findByIdAndUpdate(user._id, { $pull: { followings: userID } }, (error, _) => {
          if (error) return res.status(400).json({ error })
          res.send()
        })
      })
    })
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() })
        return
      }

      const user = await User.findOne({ username: req.body.username })

      if (user) {
        res.status(409).json({
          status: 'error',
          message: 'Такой пользователь уже существует',
        })
        return
      }

      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        followers: [],
        followings: [],
      })

      res.json({
        status: 'ok',
        message: 'Вы успешно зарегистрировались',
        data: newUser.username,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.toString(),
      })
    }
  }

  login(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', (err, user) => {
      if (err) return next(err)
      if (!user)
        return res.status(403).json({
          status: 'error',
          message: 'Неправильное имя пользователя или пароль',
        })

      req.logIn(user, (err) => {
        if (err) return next(err)

        const user = (req.user as UserSchemaWithDocument).toJSON()

        const data = {
          ...user,
          token: jwt.sign({ user }, process.env.SECRET_KEY || 'secret_key'),
        }

        return res.json({
          status: 'ok',
          data,
        })
      })
    })(req, res, next)
  }
}

export const userController = new UserController()
