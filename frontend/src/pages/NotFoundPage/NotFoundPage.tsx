/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:13
 */

import { Box, Container, Typography } from '@material-ui/core'

import React from 'react'

const NotFoundPage: React.FC = () => (
  <Container>
    <Box
      height="60vh"
      width="90vh"
      m="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">Ups! Page not found</Typography>
    </Box>
  </Container>
)

export default NotFoundPage
