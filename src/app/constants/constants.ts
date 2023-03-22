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
  { name: 'Categories', emoji: '🏷', route: ROUTES_ENUM.CATEGORIES },
  { name: 'Wallets', emoji: '👛', route: ROUTES_ENUM.WALLETS },
  { name: 'Statistics', emoji: '📈', route: ROUTES_ENUM.STATISTICS }
]

export const ROUTES_ANIMATIONS: AnimationTriggerMetadata[] = [
  trigger('moveFromRight', [
    transition(
      `index => ${ROUTES_ENUM.OPERATIONS}`,
      useAnimation(moveFromRight)
    ),
    transition(
      `index => ${ROUTES_ENUM.CATEGORIES}`,
      useAnimation(moveFromRight)
    ),
    transition(`index => ${ROUTES_ENUM.WALLETS}`, useAnimation(moveFromRight)),
    transition(
      `index => ${ROUTES_ENUM.STATISTICS}`,
      useAnimation(moveFromRight)
    )
  ]),
  trigger('moveFromLeft', [
    transition(
      `${ROUTES_ENUM.OPERATIONS} => index`,
      useAnimation(moveFromLeft)
    ),
    transition(
      `${ROUTES_ENUM.CATEGORIES} => index`,
      useAnimation(moveFromLeft)
    ),
    transition(`${ROUTES_ENUM.WALLETS} => index`, useAnimation(moveFromLeft)),
    transition(`${ROUTES_ENUM.STATISTICS} => index`, useAnimation(moveFromLeft))
  ])
]
