import { OperationType } from '../shared/interfaces'
import { OPERATION_TYPES } from '../shared/enums'
import { Markup } from 'telegraf'
import { WalletDto } from '../api/dtos/wallet.dto'
import { CategoryDto } from '../api/dtos/category.dto'

export const getOperationDataFromMessage = (message: string): { type: OperationType, sum: number, comment: string } => {
  const type = message[0] === '+' ? OPERATION_TYPES.INCOME : OPERATION_TYPES.EXPENSE

  const [splitSum, ...splitComment] = message.split(' ')
  const sum = +splitSum.replace(',', '.')
  const comment = splitComment.join(' ')

  if (isNaN(sum)) {
    throw new Error('No sum or incorrect sum value')
  }

  return { type, sum, comment }
}

export const getCategoriesKeyboard = (categories: CategoryDto[], wallets: WalletDto[], checkedWalletId: string) => {
  const categoriesButtons = categories.map(c => Markup.button.callback(c.name, `category:${c.id}`))
  const walletsButtons = wallets.map(w => Markup.button.callback(
    w.id === checkedWalletId ? `✅ ${w.name}` : w.name,
    `wallet:${w.id}`
  ))
  const keyboard = [
    ...categoriesButtons,
    Markup.button.callback('🚫🚫🚫', 'cancel'),
    ...walletsButtons
  ]

  return Markup.inlineKeyboard(
    [...keyboard],
    {
      wrap: (btn, index) => {
        // @ts-ignore
        return index % 3 === 0 || btn.callback_data === 'cancel' || keyboard[index - 1]?.callback_data === 'cancel'
      }
    }
  )
}
