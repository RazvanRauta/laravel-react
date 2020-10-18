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
  created_at: Date
  updated_at: Date

  constructor(
    id: number,
    title: string,
    description: string,
    price: string,
    postedDate: Date,
    advertUrl: string,
    imageUrl: string,
    advertId: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.postedDate = postedDate
    this.advertUrl = advertUrl
    this.imageUrl = imageUrl
    this.advertId = advertId
    this.created_at = created_at
    this.updated_at = updated_at
  }
}

export default Advert
