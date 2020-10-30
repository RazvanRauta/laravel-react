/**
 *  @author: Razvan Rauta
 *  Date: Oct 29 2020
 *  Time: 16:41
 */

import { AttachMoney, HomeOutlined, Today } from '@material-ui/icons'
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'

import AdvCarousel from '../Carousel'
import Advert from '@/models/advert'
import { Helmet } from 'react-helmet'
import React from 'react'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'
import useStyles from './styles'

const AdvertView: React.FC<Advert> = ({
  advertUrl,
  advertId,
  floor,
  images,
  description,
  price,
  priceType,
  rooms,
  size,
  title,
  postedDate,
  city,
  region,
}) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link
          rel="canonical"
          href={`https://ama.rrazvan.dev${location.pathname}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
        <meta property="og:image" content={images[0].imageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="274" />
        <meta property="og:image:height" content="274" />
        <meta
          property="og:url"
          content={`https://ama.rrazvan.dev${location.pathname}`}
        />
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        width="90%"
        mx="auto"
      >
        {title && (
          <Typography align="left" component="h1" variant="h5" gutterBottom>
            {title}
          </Typography>
        )}
        {images && title && <AdvCarousel images={images} title={title} />}
        <Box
          display="flex"
          justifyContent="space-between"
          my={5}
          px={[0, 0, 5]}
          width="100%"
        >
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

        {description && (
          <>
            <Typography gutterBottom component="h2" variant="h5">
              Description:
            </Typography>
            <Typography gutterBottom component="p" variant="body1">
              {description}
            </Typography>
          </>
        )}

        <Box marginTop="20px">
          <Typography gutterBottom component="h2" variant="h5">
            Details:
          </Typography>
        </Box>

        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Region
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {region ?? 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  City
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {city ?? 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Price
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {price ? `${price} ${priceType}` : 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Posted Date
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {postedDate
                    ? format(new Date(postedDate), 'MMM dd, yyyy')
                    : 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Number of Rooms
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {rooms ?? 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Total Area / Living Area / Kitchen
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {size ?? 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Floor Location
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {floor ?? 'Not Specified'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  Original Url
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  {advertUrl && (
                    <a
                      href={advertUrl}
                      className={classes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{`real.by/${advertId}`}</a>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default AdvertView
