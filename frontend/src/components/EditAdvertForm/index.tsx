/**
 *  @author: Razvan Rauta
 *  Date: Nov 02 2020
 *  Time: 20:45
 */

import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import React, { useState } from 'react'

import Advert from '@/models/advert'
import AdvertsApi from '@/services/adverts-api'
import { AttachMoney } from '@material-ui/icons'
import { RootState } from '@/redux/rootReducer'
import SubmitButton from '../SubmitButton'
import { editFormSchema } from '@/constants'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useStyles from './styles'

interface FormStatus {
  message: string
  type: 'success' | 'error' | ''
}

interface EditAdvertFormValues {
  title: string
  description: string
  price: number
  priceType: string
}

const EditAdvertForm: React.FC<Advert> = (adv) => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: '',
    type: '',
  })
  const classes = useStyles()
  const history = useHistory()

  const { token, tokenType } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (
    data: EditAdvertFormValues,
    helpers: FormikHelpers<EditAdvertFormValues>
  ) => {
    try {
      if (data && token && tokenType) {
        const advertsApi = new AdvertsApi()
        const response = await advertsApi.updateAdvert(
          adv.id,
          data.title,
          data.description,
          data.price,
          data.priceType,
          token,
          tokenType
        )
        if (response.id) {
          history.push(`/adv/${response.id}`)
        }
      }
    } catch (error) {
      console.log(error)
      setFormStatus({
        message: `${error}`,
        type: 'error',
      })
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: adv.title ?? '',
          description: adv.description ?? '',
          price: parseInt(adv.price) ?? '',
          priceType: adv.priceType ?? '',
        }}
        onSubmit={handleSubmit}
        validationSchema={editFormSchema}
      >
        {(props: FormikProps<EditAdvertFormValues>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            isValid,
          } = props
          return (
            <Form>
              <h1 className={classes.title}>{`Edit: #${adv.advertId}`}</h1>
              <Grid container justify="space-around" direction="row">
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="title"
                    id="title"
                    label="Title"
                    value={values.title}
                    type="textarea"
                    helperText={
                      errors.title && touched.title
                        ? errors.title
                        : "The advert's title"
                    }
                    error={errors.title && touched.title ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.descriptionField}
                >
                  <TextField
                    name="description"
                    id="description"
                    multiline
                    label="Advert Description"
                    value={values.description}
                    type="textarea"
                    helperText={
                      errors.description && touched.description
                        ? errors.description
                        : null
                    }
                    error={
                      errors.description && touched.description ? true : false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.priceContainer}
                >
                  <TextField
                    name="price"
                    id="price"
                    label="Advert Price"
                    value={values.price}
                    type="number"
                    className={classes.price}
                    helperText={
                      errors.price && touched.price ? errors.price : null
                    }
                    error={errors.price && touched.price ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    name="priceType"
                    id="priceType"
                    label="Advert Price Type"
                    value={values.priceType}
                    className={classes.priceType}
                    type="string"
                    helperText={
                      errors.priceType && touched.priceType
                        ? errors.priceType
                        : null
                    }
                    error={errors.priceType && touched.priceType ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <SubmitButton
                    disabled={isSubmitting || !isValid}
                    isSubmitting={isSubmitting}
                  />
                  <div className="formStatus">
                    {formStatus.type === 'error' ? (
                      <p className={classes.errorMessage}>
                        {formStatus.message}
                      </p>
                    ) : formStatus.type === 'success' ? (
                      <p className={classes.successMessage}>
                        {formStatus.message}
                      </p>
                    ) : null}
                  </div>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default EditAdvertForm
