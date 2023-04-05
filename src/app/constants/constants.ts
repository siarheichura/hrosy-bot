import {
  AnimationTriggerMetadata,
  transition,
  trigger,
  useAnimation
} from '@angular/animations'
import { moveFromLeft, moveFromRight } from 'ngx-router-animations'
import { ROUTES_ENUM } from './enums'

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

export const ROUTES_ANIMATIONS: AnimationTriggerMetadata[] = [
  trigger('moveFromRight', [
    transition(`index => *`, useAnimation(moveFromRight))
  ]),
  trigger('moveFromLeft', [
    transition(`* => index`, useAnimation(moveFromLeft))
  ])
]
