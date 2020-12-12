import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserSchema {
  _id: mongoose.Types.ObjectId
  username: string
  password: string
  avatar?: string
  activity?: {
    activityType: string
    post?: mongoose.Types.ObjectId
    body?: string
    user: mongoose.Types.ObjectId
  }[]
  followers: mongoose.Types.ObjectId[]
  followings: mongoose.Types.ObjectId[]
  validPassword(password: string): Promise<boolean>
}

export type UserSchemaWithDocument = UserSchema & mongoose.Document

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  activity: [
    {
      activityType: String,
      target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      body: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

schema.pre('save', async function (next) {
  const user = this as UserSchemaWithDocument
  const hash = await bcrypt.hash(user.password, 12)

  user.password = hash
  next()
})

schema.methods.validPassword = async function (password: string) {
  const user = this as UserSchemaWithDocument
  const isValid = await bcrypt.compare(password, user.password)

  return isValid
}

schema.set('toJSON', {
  transform: function (_, ret) {
    delete ret['password']
    return ret
  },
})

export default mongoose.model<UserSchemaWithDocument>('User', schema)
