/**
 *  @author: Razvan Rauta
 *  Date: Oct 22 2020
 *  Time: 18:15
 */

import { Box, FormGroup } from '@material-ui/core'
import { Form, Formik, FormikProps } from 'formik'

import { AdvertsFilterValues } from '@/types'
import PriceRangeSlider from '../PriceRangeSlider'
import React from 'react'
import RoomsCheckBox from '../RoomsCheckBox'
import { RootState } from '@/redux/rootReducer'
import SubmitButton from '../SubmitButton'
import { useSelector } from 'react-redux'

interface DrawerFormProps {
  bindFiltersForm: any
  handleFormSubmit: (values: AdvertsFilterValues) => Promise<void>
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  bindFiltersForm,
  handleFormSubmit,
}) => {
  const filters = useSelector((state: RootState) => state.advertsData.filters)

  return (
    <Formik
      initialValues={{
        priceRange: filters?.price ? filters?.price : [50, 250],
        '1Room': filters?.rooms ? filters?.rooms.indexOf(1) > -1 : false,
        '2Room': filters?.rooms ? filters?.rooms.indexOf(2) > -1 : false,
        '3Room': filters?.rooms ? filters?.rooms.indexOf(3) > -1 : false,
        '4Room': filters?.rooms ? filters?.rooms.indexOf(4) > -1 : false,
      }}
      onSubmit={handleFormSubmit}
    >
      {(props: FormikProps<AdvertsFilterValues>) => {
        const { handleBlur, submitForm, values, isSubmitting, dirty } = props
        if (dirty) bindFiltersForm(submitForm, values)
        return (
          <Form>
            <PriceRangeSlider
              name="priceRange"
              id="priceRange-slider"
              label="Price Range"
            />
            <FormGroup row>
              <RoomsCheckBox
                label="One Room"
                name="1Room"
                onBlur={handleBlur}
              />
              <RoomsCheckBox
                label="Two Rooms"
                name="2Room"
                onBlur={handleBlur}
              />
            </FormGroup>
            <br />
            <FormGroup row>
              <RoomsCheckBox
                label="Three Rooms"
                name="3Room"
                onBlur={handleBlur}
              />
              <RoomsCheckBox
                label="Four Rooms"
                name="4Room"
                onBlur={handleBlur}
              />
            </FormGroup>
            <Box marginTop={5}>
              <SubmitButton
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
              />
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}

export default DrawerForm
