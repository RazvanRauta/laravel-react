/**
 *  @author: Razvan Rauta
 *  Date: Oct 29 2020
 *  Time: 17:07
 */

import { AdvertImage } from '@/types'
import React from 'react'
import Slider from 'react-slick'
import useStyles from './styles'

interface Props {
  images: AdvertImage[]
  title: string
}

const AdvCarousel: React.FC<Props> = ({ images, title }) => {
  const classes = useStyles()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings} lazyLoad="ondemand" className={classes.carousel}>
      {images.map((image) => (
        <img src={image.imageUrl} alt={title} key={image.id} width="100%" />
      ))}
    </Slider>
  )
}

export default AdvCarousel
