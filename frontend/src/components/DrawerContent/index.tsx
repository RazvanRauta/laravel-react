/**
 *  @author: Razvan Rauta
 *  Date: Oct 22 2020
 *  Time: 18:07
 */

import { AdvertsFilterValues } from '@/types'
import { Box } from '@material-ui/core'
import DrawerForm from '../DrawerForm'
import React from 'react'

interface Props {
  bindFiltersForm: any
  handleSubmit: (values: AdvertsFilterValues) => Promise<void>
}

const DrawerContent: React.FC<Props> = ({ bindFiltersForm, handleSubmit }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={2}
    >
      <DrawerForm
        bindFiltersForm={bindFiltersForm}
        handleFormSubmit={handleSubmit}
      />
    </Box>
  )
}

export default DrawerContent
