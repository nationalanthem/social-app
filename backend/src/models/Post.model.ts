import mongoose from 'mongoose'

export interface CommentSchema {
  _id?: mongoose.Types.ObjectId
  body: string
  author: any
}

export interface PostSchema {
  _id?: mongoose.Types.ObjectId
  description: string
  image: string
  author: any
  comments: CommentSchema[]
}

export type PostSchemaWithDocument = PostSchema & mongoose.Document

const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      body: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
},{ timestamps: true })

export default mongoose.model<PostSchemaWithDocument>('Post', schema)
