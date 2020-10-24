/**
 *  @author: Razvan Rauta
 *  Date: Oct 24 2020
 *  Time: 19:40
 */

import * as authActions from '@/redux/actions/auth'

import { Button, Grid, TextField } from '@material-ui/core'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useState } from 'react'

import { SETTINGS_ROUTE } from '@/routes'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import { userSignInSchema } from '@/constants'

interface SignInForm {
  password: string
  email: string
}

interface FormStatus {
  message: string
  type: string
}

const SignInFrom: React.FunctionComponent = () => {
  const classes = useStyles()
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: '',
    type: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const signInUser = async (
    data: SignInForm,
    helpers: FormikHelpers<SignInForm>
  ) => {
    try {
      if (data) {
        await dispatch(authActions.login(data.email, data.password))
        history.push(SETTINGS_ROUTE)
      }
    } catch (error) {
      console.log(error)
      setFormStatus({
        message: `${error}`,
        type: 'error',
      })
      helpers.resetForm({})
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        onSubmit={signInUser}
        validationSchema={userSignInSchema}
      >
        {(props: FormikProps<SignInForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props
          return (
            <Form>
              <h1 className={classes.title}>Sign in</h1>
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
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="email"
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : 'Enter email'
                    }
                    error={errors.email && touched.email ? true : false}
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
                    name="password"
                    id="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText={
                      errors.password && touched.password
                        ? 'Please enter a valid password of min 6 characters'
                        : 'Min 6 characters'
                    }
                    error={errors.password && touched.password ? true : false}
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
                    disabled={isSubmitting}
                  >
                    Submit
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
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SignInFrom
