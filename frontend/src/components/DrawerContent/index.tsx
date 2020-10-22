/**
 *  @author: Razvan Rauta
 *  Date: Oct 22 2020
 *  Time: 18:07
 */

import { Box } from '@material-ui/core'
import React from 'react'
import DrawerForm from '../DrawerForm'

interface Props {
  bindFiltersForm: any
}

const DrawerContent: React.FC<Props> = ({ bindFiltersForm }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={2}
    >
      <DrawerForm bindFiltersForm={bindFiltersForm} />
    </Box>
  )
}

export default DrawerContent
