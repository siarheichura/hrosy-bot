import { model, Schema, Types } from 'mongoose'

export interface ITransfer {
  id: string
  user: Types.ObjectId | string
  from: Types.ObjectId | string
  to: Types.ObjectId | string
  sumFrom: number
  sumTo: number
  rate: number
  createdAt: Date | string
}

const transferSchema = new Schema<ITransfer>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  sumFrom: { type: Number, required: true },
  sumTo: { type: Number, required: true },
  rate: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
})

export const TransferModel = model('Transfer', transferSchema)
