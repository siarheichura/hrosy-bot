import { ROUTES_ENUM } from './enums'
import { IPeriod } from '@app/interfaces'
import * as dayjs from 'dayjs'

export const MENU_BUTTONS: { name: string; emoji: string; route: string }[] = [
  {
    name: 'Expenses',
    emoji: '⬆️',
    route: `${ROUTES_ENUM.OPERATIONS}/${ROUTES_ENUM.EXPENSE}`
  },
  {
    name: 'Incomes',
    emoji: '⬇️',
    route: `${ROUTES_ENUM.OPERATIONS}/${ROUTES_ENUM.INCOME}`
  },
  { name: 'Transfers', emoji: '↔️', route: `${ROUTES_ENUM.TRANSFER}` },
  { name: 'Categories', emoji: '🏷', route: ROUTES_ENUM.CATEGORIES },
  { name: 'Wallets', emoji: '👛', route: ROUTES_ENUM.WALLETS },
  { name: 'Statistics', emoji: '📈', route: ROUTES_ENUM.STATISTICS }
]

export const INITIAL_MONTH_PERIOD: IPeriod = {
  start: dayjs().startOf('month'),
  end: dayjs().endOf('month')
}
