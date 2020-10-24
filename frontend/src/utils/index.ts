import { AdvertsFilterValues } from '@/types'

export const parseFilters = (values: AdvertsFilterValues) => {
  const rooms: number[] = []
  const { priceRange } = values
  if (values['1Room']) rooms.push(1)
  if (values['2Room']) rooms.push(2)
  if (values['3Room']) rooms.push(3)
  if (values['4Room']) rooms.push(4)

  return {
    price: priceRange,
    rooms,
  }
}
