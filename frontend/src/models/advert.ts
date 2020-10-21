/**
 * @author: Razvan Rauta
 * Date: Oct 18 2020
 * Time: 18:56
 */

class Advert {
  id: number
  title: string
  description: string
  price: string
  postedDate: Date
  advertUrl: string
  imageUrl: string
  advertId: string
  rooms: number
  created_at: Date
  updated_at: Date

  constructor({
    id,
    title,
    description,
    price,
    postedDate,
    advertUrl,
    imageUrl,
    advertId,
    rooms,
    created_at,
    updated_at,
  }: Advert) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.postedDate = postedDate
    this.advertUrl = advertUrl
    this.imageUrl = imageUrl
    this.advertId = advertId
    this.rooms = rooms
    this.created_at = created_at
    this.updated_at = updated_at
  }
}

export default Advert
