import { BasketItem } from '@/core'

export const compareName = <Item extends BasketItem>(
  a: Item,
  b: Item,
): number => b.name.localeCompare(a.name)
