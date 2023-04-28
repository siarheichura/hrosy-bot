import { ROUTES_ENUM } from './enums'
import { IPeriod } from '@app/interfaces'
import * as dayjs from 'dayjs'

export const MENU_BUTTONS = [
  // REMOVE
  // {
  //   name: 'Expenses',
  //   emoji: '⬆️',
  //   icon: 'add',
  //   route: `${ROUTES_ENUM.OPERATIONS}/${ROUTES_ENUM.EXPENSE}`
  // },
  // {
  //   name: 'Incomes',
  //   emoji: '⬇️',
  //   icon: 'remove',
  //   route: `${ROUTES_ENUM.OPERATIONS}/${ROUTES_ENUM.INCOME}`
  // },
  {
    name: 'Operations',
    emoji: '',
    icon: 'payments',
    route: `${ROUTES_ENUM.OPERATIONS}`
  },
  {
    name: 'Transfers',
    emoji: '↔️',
    icon: 'sync_alt',
    route: `${ROUTES_ENUM.TRANSFER}`
  },
  {
    name: 'Categories',
    emoji: '🏷',
    icon: 'list_alt',
    route: ROUTES_ENUM.CATEGORIES
  },
  {
    name: 'Wallets',
    emoji: '👛',
    icon: 'wallet',
    route: ROUTES_ENUM.WALLETS
  },
  {
    name: 'Statistics',
    emoji: '📈',
    icon: 'bar_chart',
    route: ROUTES_ENUM.STATISTICS
  }
]

export const INITIAL_MONTH_PERIOD: IPeriod = {
  start: dayjs().startOf('month'),
  end: dayjs().endOf('month')
}
