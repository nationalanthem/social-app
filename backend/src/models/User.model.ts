import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserSchema {
  _id: mongoose.Types.ObjectId
  username: string
  password: string
  followers: mongoose.Types.ObjectId[]
  followings: mongoose.Types.ObjectId[]
  validPassword(password: string): Promise<boolean>
}

export interface IUser {
  _id: mongoose.Types.ObjectId
  username?: string
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
