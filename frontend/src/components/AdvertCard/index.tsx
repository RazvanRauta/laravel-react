/**
 *  @author: Razvan Rauta
 *  Date: Oct 20 2020
 *  Time: 20:58
 */

import { AttachMoney, Today } from '@material-ui/icons'
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
import React from 'react'
import { format } from 'date-fns'
import useStyles from './styles'

const AdvertCard: React.FC<Advert> = ({
  title,
  description,
  price,
  postedDate,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://static.realt.by/user/8e/k/r2001v45uk8e/6960d160b7.jpg?1545387494"
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
          >
            {description}
          </Typography>
          <Divider classes={{ root: classes.divider }} />
          <Box display="flex" justifyContent="space-between" marginTop={1}>
            <Chip
              icon={<AttachMoney />}
              label={price}
              color="secondary"
              variant="outlined"
            />
            <Chip
              icon={<Today />}
              label={format(new Date(postedDate), 'MMM dd, yyyy')}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AdvertCard
