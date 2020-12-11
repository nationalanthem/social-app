import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { CommentSchema } from '../models/Post.model'
import Post, { PostSchema } from '../models/Post.model'
import User, { UserSchema } from '../models/User.model'

class PostController {
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
      }

      const { description, image } = req.body
      const user = req.user as UserSchema

      const post: PostSchema = {
        description,
        image,
        author: user._id,
        comments: [],
      }

      await Post.create(post)

      res.sendStatus(201)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  deletePost(req: Request, res: Response): void {
    const { postID } = req.params
    const user = req.user as UserSchema

    Post.findById(postID)
      .populate('author', '_id username')
      .exec((error, result) => {
        if (error) return res.status(400).json({ error })
        if (!result) return res.sendStatus(404)
        if (result.author._id.equals(user._id)) {
          result.deleteOne((error) => {
            if (error) return res.status(400).json({ error })
            res.send()
          })
        } else {
          res.sendStatus(403)
        }
      })
  }

  addComment(req: Request, res: Response): void {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    const { postID, body } = req.body
    const user = req.user as UserSchema

    const comment: CommentSchema = {
      body,
      author: user._id,
    }

    Post.findByIdAndUpdate(postID, { $push: { comments: comment } }, { new: true })
      .populate('comments.author', '_id username')
      .exec((error, result) => {
        if (error) return res.status(400).json({ error })

        res.json({ data: result })
      })
  }

  deleteComment(req: Request, res: Response): void {
    const { postID, commentID } = req.params
    const user = req.user as UserSchema

    Post.findById(postID)
      .populate('comments.author', '_id username')
      .exec((error, result) => {
        if (error) return res.status(400).json({ error })
        if (!result) return res.sendStatus(404)
        const commentIndex = result.comments.findIndex((comment) => comment._id?.equals(commentID))
        if (commentIndex === -1) return res.sendStatus(404)
        if (
          result.comments[commentIndex].author._id.equals(user._id) ||
          result.author._id.equals(user._id)
        ) {
          result.updateOne({ $pull: { comments: { _id: commentID } } }, (error) => {
            if (error) return res.status(400).json({ error })
            res.send()
          })
        } else res.sendStatus(403)
      })
  }

  async getPosts(req: Request, res: Response): Promise<void> {
    const { page = 1 } = req.query

    try {
      const posts = await Post.find({})
        .limit(3)
        .skip((+page - 1) * 3)
        .sort('-createdAt')
        .populate('author', '_id username avatar')
        .populate('comments.author', '_id username')

      const count = await Post.countDocuments()

      res.json({ posts, totalPages: Math.ceil(count / 3), currentPage: +page })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async getFollowingsPosts(req: Request, res: Response): Promise<void> {
    const { page = 1 } = req.query
    const userFromReq = req.user as UserSchema

    const user = (await User.findById(userFromReq._id)) as UserSchema

    try {
      const posts = await Post.find({
        author: { $in: user.followings },
      })
        .limit(3)
        .skip((+page - 1) * 3)
        .sort('-createdAt')
        .populate('author', '_id username avatar')
        .populate('comments.author', '_id username')

      const count = await Post.find({}).countDocuments({
        author: { $in: user.followings },
      })

      res.json({ posts, totalPages: Math.ceil(count / 3), currentPage: +page })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  getPostById(req: Request, res: Response): void {
    const { postID } = req.params

    Post.findById(postID)
      .populate('author', '_id username avatar')
      .populate('comments.author', '_id username')
      .exec((error, post) => {
        if (error) return res.status(404).json({ error: 'Такой публикации не существует' })
        res.json({ data: post })
      })
  }

  getPostsFromUser(req: Request, res: Response): void {
    const { userID } = req.params

    Post.find({ author: userID })
      .select('-comments -author')
      .sort('-createdAt')
      .exec((error, posts) => {
        if (error) return res.status(400).json({ error })
        res.json({ data: posts })
      })
  }

  getMyPosts(req: Request, res: Response): void {
    const user = req.user as UserSchema

    Post.find({ author: user._id })
      .populate('author', '_id username')
      .sort('-createdAt')
      .exec((error, data) => {
        if (error) return res.status(400).json({ error })
        res.json({
          status: 'ok',
          data,
        })
      })
  }
}

export const postController = new PostController()
