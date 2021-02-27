/**
 *  @author: Razvan Rauta
 *  Date: Oct 20 2020
 *  Time: 20:58
 */

import * as advertsActions from '@/redux/actions/adverts'
import isArray from 'lodash/isArray'
import isUndefined from  'lodash/isUndefined'

import { AttachMoney, Delete, HomeOutlined, Today } from '@material-ui/icons'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'

import Advert from '@/models/advert'
import { Link } from 'react-router-dom'
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
  const [loading, setLoading] = useState(false)

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setLoading(true)
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
            image={isArray(images) && !isUndefined(images[0]) ? images[0].imageUrl : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
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
              <Tooltip title="Price" arrow leaveDelay={200}>
                <Chip
                  icon={<AttachMoney />}
                  label={`${price} ${priceType}`}
                  color="secondary"
                  variant="outlined"
                  className={classes.chip}
                />
              </Tooltip>
              <Tooltip title="Number of rooms" arrow leaveDelay={200}>
                <Chip
                  icon={<HomeOutlined />}
                  label={rooms > 1 ? `${rooms} Rooms` : `One Room`}
                  color="secondary"
                  variant="outlined"
                  className={classes.chip}
                />
              </Tooltip>
              <Tooltip title="Date posted" arrow leaveDelay={200}>
                <Chip
                  icon={<Today />}
                  label={format(
                    new Date(postedDate.replace(/ /g, 'T') + 'Z'),
                    'MMM dd, yyyy'
                  )}
                  color="secondary"
                  variant="outlined"
                  className={classes.chip}
                />
              </Tooltip>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      {user && (
        <Tooltip title="Delete advert" arrow leaveDelay={200}>
          <IconButton
            disabled={loading}
            className={classes.delete}
            onClick={handleClick}
          >
            <Avatar>
              {!loading ? (
                <Delete color="secondary" />
              ) : (
                <CircularProgress size={20} color="secondary" />
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      )}
    </Card>
  )
}

export default AdvertCard
