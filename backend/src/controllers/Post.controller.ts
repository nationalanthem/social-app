import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { CommentSchema } from '../models/Post.model'
import Post, { PostSchema } from '../models/Post.model'
import { IUser } from '../models/User.model'

class PostController {
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() })
        return
      }

      const { description, image } = req.body
      const user = req.user as IUser

      const post: PostSchema = {
        description,
        image,
        author: user._id,
        comments: [],
      }

      const newPost = await Post.create(post)

      res.status(201).json({ status: 'ok', data: newPost })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        error: err,
      })
    }
  }

  deletePost(req: Request, res: Response): void {
    const { postID } = req.params
    const user = req.user as IUser

    Post.findById(postID)
      .populate('author', '_id username')
      .exec((err, result) => {
        if (err) return res.status(400).json({ status: 'error', error: err })
        if (!result) return res.sendStatus(404)
        if (result.author._id.equals(user._id)) {
          result.deleteOne((err) => {
            if (err) return res.status(400).json({ status: 'error', error: err })
            res.json({
              status: 'ok',
              message: 'Публикация удалена',
            })
          })
        } else {
          res.sendStatus(403)
        }
      })
  }

  addComment(req: Request, res: Response): void {
    const { postID, body } = req.body
    const user = req.user as IUser

    const comment: CommentSchema = {
      body,
      author: user._id,
    }

    Post.findByIdAndUpdate(postID, { $push: { comments: comment } }, { new: true })
      .populate('comments.author', '_id username')
      .exec((err, result) => {
        if (err) return res.status(400).json({ status: 'error', error: err })

        res.json({ status: 'ok', data: result })
      })
  }

  deleteComment(req: Request, res: Response): void {
    const { postID, commentID } = req.params
    const user = req.user as IUser

    Post.findById(postID)
      .populate('comments.author', '_id username')
      .exec((err, result) => {
        if (err) return res.status(400).json({ status: 'error', error: err })
        if (!result) return res.sendStatus(404)
        const commentIndex = result.comments.findIndex((comment) => comment._id?.equals(commentID))
        if (commentIndex === -1) return res.sendStatus(404)
        if (result.comments[commentIndex].author._id.equals(user._id)) {
          result.updateOne({ $pull: { comments: { _id: commentID } } }, (err) => {
            if (err) return res.status(400).json({ status: 'error', error: err })
            res.json({ status: 'ok', message: 'Комментарий удалён' })
          })
        } else res.sendStatus(403)
      })
  }

  async getPosts(req: Request, res: Response): Promise<void> {
    const { page = 1 } = req.query

    try {
      const posts = await Post.find({})
        .limit(5)
        .skip((+page - 1) * 5)
        .sort('-createdAt')
        .populate('author', '_id username')
        .populate('comments.author', '_id username')

      const count = await Post.countDocuments()

      res.json({ posts, totalPages: Math.ceil(count / 5), currentPage: +page })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  getPostById(req: Request, res: Response): void {
    const { postID } = req.params

    Post.findById(postID)
      .populate('author', '_id username')
      .populate('comments.author', '_id username')
      .exec((err, post) => {
        if (err) return res.status(400).json({ status: 'error', error: err })
        res.json({ status: 'ok', data: post })
      })
  }

  getPostsFromUser(req: Request, res: Response): void {
    const { userID } = req.params

    Post.find({ author: userID })
      .select('-comments -author')
      .sort('-createdAt')
      .exec((err, posts) => {
        if (err) return res.status(400).json({ status: 'error', error: err })
        res.json({ status: 'ok', data: posts })
      })
  }

  getMyPosts(req: Request, res: Response): void {
    const user = req.user as IUser

    Post.find({ author: user._id })
      .populate('author', '_id username')
      .sort('-createdAt')
      .exec((err, data) => {
        if (err) return res.status(400).json({ status: 'error', error: err })
        res.json({
          status: 'ok',
          data,
        })
      })
  }
}

export const postController = new PostController()
