import { model, Schema } from 'mongoose'

export interface IUser {
  id: string
  chatId: string
  username: string
  firstName: string
  lastName: string
  // categories: {
  //   expense: string[]
  //   income: string[]
  // }
}

const userSchema = new Schema<IUser>({
  chatId: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // categories: {
  //   expense: [{ type: String }],
  //   income: [{ type: String }]
  // }
}, {
  timestamps: true
})

export const UserModel = model('User', userSchema)
