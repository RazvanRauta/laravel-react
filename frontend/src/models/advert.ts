/**
 * @author: Razvan Rauta
 * Date: Oct 18 2020
 * Time: 18:56
 */

import {AdvertImage} from '@/types'

class Advert {
    id: number
    title: string
    description: string
    price: string
    priceType: string
    postedDate: Date
    advertUrl: string
    images: AdvertImage[]
    size: string
    floor: string
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
                    priceType,
                    size,
                    images,
                    floor,
                    advertId,
                    rooms,
                    created_at,
                    updated_at,
                }: Advert) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.priceType = priceType
        this.postedDate = postedDate
        this.advertUrl = advertUrl
        this.size = size
        this.floor = floor
        this.images = images
        this.advertId = advertId
        this.rooms = rooms
        this.created_at = created_at
        this.updated_at = updated_at
    }
}

export default Advert
