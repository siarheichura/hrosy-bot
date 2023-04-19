import { ITransfer } from '../../models/Transfer'

export class TransferDto {
  id: string
  user: string
  from: string
  to: string
  sumFrom: number
  sumTo: number
  rate: number
  createdAt: Date | string

  constructor(model: ITransfer) {
    this.id = model.id
    this.user = model.user.toString()
    this.from = model.from.toString()
    this.to = model.to.toString()
    this.sumFrom = model.sumFrom
    this.sumTo = model.sumTo
    this.rate = model.rate
    this.createdAt = model.createdAt
  }
}
