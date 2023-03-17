import { ROUTES_ENUM } from './enums'

export const MENU_BUTTONS: { name: string; emoji: string; route: string }[] = [
  { name: 'Expenses', emoji: '⬆️', route: ROUTES_ENUM.EXPENSES },
  { name: 'Incomes', emoji: '⬇️', route: ROUTES_ENUM.INCOMES },
  { name: 'Categories', emoji: '🏷', route: ROUTES_ENUM.CATEGORIES },
  { name: 'Wallets', emoji: '👛', route: ROUTES_ENUM.WALLETS },
  { name: 'Statistics', emoji: '📈', route: ROUTES_ENUM.STATISTICS }
]
