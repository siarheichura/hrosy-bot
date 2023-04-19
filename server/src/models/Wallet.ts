import { model, Schema, Types } from 'mongoose'

export interface IWallet {
  id: string
  user: Types.ObjectId
  name: string
  currency: string
  balance: number
  isMain: boolean
  deletedAt: Date
}

const walletSchema = new Schema<IWallet>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  currency: { type: String, required: true },
  balance: { type: Number, default: 0 },
  isMain: { type: Boolean, default: false },
  deletedAt: { type: Date }
})

export const WalletModel = model('Wallet', walletSchema)
