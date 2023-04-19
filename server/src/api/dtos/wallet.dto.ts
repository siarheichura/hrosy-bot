import { IWallet } from '../../models/Wallet'

export class WalletDto {
  id: string
  name: string
  currency: string
  balance: number
  isMain: boolean

  constructor(model: IWallet) {
    this.id = model.id
    this.name = model.name
    this.currency = model.currency
    this.balance = model.balance
    this.isMain = model.isMain
  }
}
