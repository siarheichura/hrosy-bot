import { model, Schema, Types } from 'mongoose'
import { OperationType } from '../shared/interfaces'

export interface IOperation {
  id: string
  user: Types.ObjectId | string
  wallet: Types.ObjectId | string
  category: Types.ObjectId | string
  type: OperationType
  // category: string
  sum: number
  // currency: string
  comment: string
  createdAt: Date
}

const operationSchema = new Schema<IOperation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  type: { type: String, required: true },
  // category: { type: String, required: true },
  sum: { type: Number, required: true },
  // currency: { type: String, required: true },
  comment: { type: String },
  createdAt: { type: Date, required: true, default: Date.now() }
})

export const OperationModel = model('Operation', operationSchema)

