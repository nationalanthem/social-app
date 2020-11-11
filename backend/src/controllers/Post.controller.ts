import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import Post from '../models/Post.model'
import { UserSchema } from '../models/User.model'

class PostController {
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() })
        return
      }

      const { description, image } = req.body

      const post = await Post.create({
        description,
        image,
        author: req.user as UserSchema,
      })

      res.status(201).json({ status: 'ok', data: post })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        error: err,
      })
    }
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await Post.find({}).populate('author', '_id username')
      res.json({ status: 'ok', data: posts })
    } catch (err) {
      res.status(500).json({ status: 'error', error: err })
    }
  }

  async getMyPosts(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as UserSchema
      const myPosts = await Post.find({ author: user._id }).populate('author', '_id username')

      res.json({
        status: 'ok',
        data: myPosts,
      })
    } catch (err) {
      res.status(500).json({ status: 'error', error: err })
    }
  }
}

export const postController = new PostController()
