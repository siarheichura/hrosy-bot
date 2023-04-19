import { OPERATION_TYPES } from '../shared/enums'
import { service } from '../api/service'
import { OperationDto } from '../api/dtos/operation.dto'
import { WalletModel } from '../models/Wallet'
import { CategoryModel } from '../models/Category'

export const DATE_FORMAT = 'DD/MM/YYYY'

export const BASIC_WALLETS = [
  { name: '💳Картка', currency: 'BYN', balance: 0, isMain: true },
  { name: '💰Наяўныя', currency: 'BYN', balance: 0, isMain: false },
  { name: '🐖Скарбонка', currency: 'BYN', balance: 0, isMain: false }
]

export const BASIC_EXPENSE_CATEGORIES = [
  '🥐Прадукты',
  '🏠Кватэра',
  '💡Камуналка',
  '🎵Падпіскі',
  '🍽️Рэстараны',
  '🚌Транспарт',
  '⚽Спорт',
  '💃Забавы',
  '👕Адзенне',
  '🎁Падарункі',
  '💉Лекі',
  '🧴Гігіена',
  '🧹Гаспадарчыя тавары',
  '🗑️Страты',
  '💰Іншае'
]

export const BASIC_INCOME_CATEGORIES = [
  '💳Зарплата',
  '🎁Падарункі',
  '💰Іншае'
]

export const MESSAGES = {
  GREETING: (username: string) =>
    `Прывітанне, <b>${username}!👋</b> Вельмі рады бачыць цябе тут🤗\n` +
    `\n` +
    `1. Адпраў мне выдатак у фармаце <b>[колькі] [каментар(не абавязкова)].</b> \n` +
    `2. Выберы патрэбную катэгорыю. \n` +
    `\n` +
    `(калі трэба дадаць даход, то проста дадай <b>'+'</b> перад сумай) \n` +
    `\n` +
    `🤍❤️🤍`,

  CHOOSE_CATEGORY: '🏷️Выберы катэгорыю',

  BALANCE: async (userId: string) => {
    const wallets = await service.getWallets(userId)

    return wallets.reduce((prev, wallet) =>
      prev + `${wallet.name}: ${wallet.balance}${wallet.currency}\n`, '<b>⚖️Мой баланс:</b>\n'
    )
  },

  OPERATION_ADDED: async (operation: OperationDto) => {
    const currency = (await WalletModel.findById(operation.wallet))?.currency
    const categoryName = (await CategoryModel.findById(operation.category))?.name

    const type = `${operation.type === OPERATION_TYPES.INCOME ? 'даход' : 'выдатак'}`

    return `` +
      `<b>Дададзены новы ${type}:</b>\n` +
      `<b>📝Катэгорыя:</b> <pre>${categoryName}</pre>\n` +
      `<b>💵Сума:</b> <pre>${operation.sum}${currency}</pre>\n` +
      `<b>💬Каментар:</b> <pre>${operation.comment || ' '}</pre>\n\n`
  }
}
