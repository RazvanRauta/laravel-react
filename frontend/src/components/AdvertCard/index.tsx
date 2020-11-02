/**
 *  @author: Razvan Rauta
 *  Date: Oct 20 2020
 *  Time: 20:58
 */

import * as advertsActions from '@/redux/actions/adverts'

import { AttachMoney, Delete, HomeOutlined, Today } from '@material-ui/icons'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'

import Advert from '@/models/advert'
import { Link } from 'react-router-dom'
import React from 'react'
import User from '@/models/user'
import format from 'date-fns/format'
import { useDispatch } from 'react-redux'
import useStyles from './styles'

interface AdvertCardProps {
  advert: Advert
  user: User | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
}

const AdvertCard: React.FC<AdvertCardProps> = ({ advert, user, setError }) => {
  const {
    title,
    description,
    price,
    priceType,
    postedDate,
    rooms,
    id,
    images,
  } = advert
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    console.log('hello')
    await dispatch(advertsActions.deleteAdvert(advert.id))
    try {
    } catch (error) {
      setError(error)
    }
  }

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
      {user && (
        <IconButton className={classes.delete} onClick={handleClick}>
          <Avatar>
            <Delete color="secondary" />
          </Avatar>
        </IconButton>
      )}
    </Card>
  )
}

export default AdvertCard
