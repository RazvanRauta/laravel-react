/**
 *  @author: Razvan Rauta
 *  Date: Nov 01 2020
 *  Time: 14:42
 */

import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useState } from 'react'

import ParserApi from '@/services/parser-api'
import { RootState } from '@/redux/rootReducer'
import { runParserSchema } from '@/constants'
import { useSelector } from 'react-redux'
import useStyles from './styles'

interface Props {
  inProgress: boolean
}

interface RunParserFormValues {
  startingPageNumber: number
  maxNumberOfPages: number
}

interface FormStatus {
  message: string
  type: 'success' | 'error' | ''
}

const RunParserForm: React.FC<Props> = ({ inProgress }) => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: '',
    type: '',
  })
  const classes = useStyles()

  const { token, tokenType } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (
    data: RunParserFormValues,
    helpers: FormikHelpers<RunParserFormValues>
  ) => {
    try {
      if (data && token && tokenType) {
        const parserApi = new ParserApi()
        const response = await parserApi.startParser(
          data.startingPageNumber,
          data.maxNumberOfPages,
          token,
          tokenType
        )
        if (response.message) {
          setFormStatus({
            message: response.message,
            type: 'success',
          })
        }
      }
    } catch (error) {
      console.log(error)
      setFormStatus({
        message: `${error}`,
        type: 'error',
      })
    } finally {
      helpers.resetForm({})
      setTimeout(
        () =>
          setFormStatus({
            message: '',
            type: '',
          }),
        5000
      )
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          startingPageNumber: 0,
          maxNumberOfPages: 3,
        }}
        onSubmit={handleSubmit}
        validationSchema={runParserSchema}
      >
        {(props: FormikProps<RunParserFormValues>) => {
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
              <h1 className={classes.title}>Run parser manually</h1>
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
                    name="startingPageNumber"
                    id="startingPageNumber"
                    label="Page number"
                    value={values.startingPageNumber}
                    type="number"
                    helperText={
                      errors.startingPageNumber && touched.startingPageNumber
                        ? errors.startingPageNumber
                        : 'The number of the page form where the parser will start'
                    }
                    error={
                      errors.startingPageNumber && touched.startingPageNumber
                        ? true
                        : false
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
                  className={classes.textField}
                >
                  <TextField
                    name="maxNumberOfPages"
                    id="maxNumberOfPages"
                    label="Number of pages that will be parsed. 0 - 99"
                    value={values.maxNumberOfPages}
                    type="number"
                    helperText={
                      errors.maxNumberOfPages && touched.maxNumberOfPages
                        ? errors.maxNumberOfPages
                        : 'The number of pages that the parser will look into. 1 - 10'
                    }
                    error={
                      errors.maxNumberOfPages && touched.maxNumberOfPages
                        ? true
                        : false
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
                  className={classes.submitButton}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting || inProgress || !isValid}
                  >
                    Submit*
                  </Button>
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
                {!formStatus.type.length && (
                  <Grid
                    item
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    className={classes.helperText}
                  >
                    <Typography variant="caption">
                      * on submit, the command will be added to queue
                      <br /> and will start in 2-3 min
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RunParserForm
