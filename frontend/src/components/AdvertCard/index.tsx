/**
 *  @author: Razvan Rauta
 *  Date: Oct 20 2020
 *  Time: 20:58
 */

import { AttachMoney, HomeOutlined, Today } from '@material-ui/icons'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from '@material-ui/core'

import Advert from '@/models/advert'
import { Link } from 'react-router-dom'
import React from 'react'
import { format } from 'date-fns'
import useStyles from './styles'

const AdvertCard: React.FC<Advert> = ({
  title,
  description,
  price,
  priceType,
  postedDate,
  rooms,
  id,
  images,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Link className={classes.link} to={`/adv/${id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={images[0].imageUrl}
            title={title}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h2" noWrap>
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {description}
            </Typography>
            <Divider classes={{ root: classes.divider }} />
            <Box display="flex" justifyContent="space-between" marginTop={1}>
              <Chip
                icon={<AttachMoney />}
                label={`${price} ${priceType}`}
                color="secondary"
                variant="outlined"
                className={classes.chip}
              />
              <Chip
                icon={<HomeOutlined />}
                label={rooms > 1 ? `${rooms} Rooms` : `One Room`}
                color="secondary"
                variant="outlined"
                className={classes.chip}
              />
              <Chip
                icon={<Today />}
                label={format(new Date(postedDate), 'MMM dd, yyyy')}
                color="secondary"
                variant="outlined"
                className={classes.chip}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default AdvertCard
