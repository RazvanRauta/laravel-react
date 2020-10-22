/**
 *  @author: Razvan Rauta
 *  Date: Oct 22 2020
 *  Time: 18:15
 */

import React from 'react'
import { Formik, Form, FormikProps, FormikHelpers } from 'formik'
import { FormGroup, LinearProgress } from '@material-ui/core'
import PriceRangeSlider from '../PriceRangeSlider'
import { AdvertsFilter } from '@/types'
import RoomsCheckBox from '../RoomsCheckBox'

interface DrawerFormProps {
  bindFiltersForm: any
}

const DrawerForm: React.FC<DrawerFormProps> = ({ bindFiltersForm }) => {
  const handleSubmit = (
    values: AdvertsFilter,
    helpers: FormikHelpers<AdvertsFilter>
  ) => {
    const { setSubmitting } = helpers
    try {
      console.log({ values })

      setSubmitting(false)
    } catch (e) {}
  }

  return (
    <Formik
      initialValues={{
        priceRange: [50, 1000],
        '1Room': false,
        '2Room': false,
        '3Room': false,
        '4Room': false,
      }}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<AdvertsFilter>) => {
        const { handleBlur, isSubmitting, submitForm, values } = props
        bindFiltersForm(submitForm, values)
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
            {isSubmitting && <LinearProgress />}
          </Form>
        )
      }}
    </Formik>
  )
}

export default DrawerForm
