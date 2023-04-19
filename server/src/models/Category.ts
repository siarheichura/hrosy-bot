import { model, Schema, Types } from 'mongoose'
import { OperationType } from '../shared/interfaces'

export interface ICategory {
  id: string
  user: Types.ObjectId | string
  type: OperationType
  name: string
  deletedAt: Date
}

const categorySchema = new Schema<ICategory>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  deletedAt: { type: Date }
})

export const CategoryModel = model('Category', categorySchema)
