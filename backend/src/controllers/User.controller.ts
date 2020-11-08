import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User, { UserSchemaWithDocument } from '../models/User.model'
import { passport } from '../passport'

class UserController {
  ownProfile(req: Request, res: Response): void {
    res.json({
      status: 'ok',
      data: req.user,
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
