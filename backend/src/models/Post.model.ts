import mongoose from 'mongoose'

interface PostSchema {
  description: string
  image?: string
  author: Express.User
}

export type PostSchemaWithDocument = PostSchema & mongoose.Document

const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'blank',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model<PostSchemaWithDocument>('Post', schema)
