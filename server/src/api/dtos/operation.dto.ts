import { IOperation } from '../../models/Operation'
import { OperationType } from '../../shared/interfaces'

export class OperationDto {
  id: string
  // user: string
  wallet: string
  type: OperationType
  category: string
  sum: number
  // currency: string
  comment: string
  createdAt: string

  constructor(model: IOperation) {
    this.id = model.id
    // this.user = model.user.toString()
    this.wallet = model.wallet.toString()
    this.type = model.type
    this.category = model.category.toString()
    this.sum = model.sum
    // this.currency = model.currency
    this.comment = model.comment
    this.createdAt = model.createdAt.toISOString()
  }
}
