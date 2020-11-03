/**
 *  @author: Razvan Rauta
 *  Date: Oct 31 2020
 *  Time: 18:06
 */

import * as authActions from '@/redux/actions/auth'

import { Button, Grid, TextField } from '@material-ui/core'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useState } from 'react'

import { SETTINGS_ROUTE } from '@/routes'
import { SignUpFormValues } from '@/types'
import SubmitButton from '../SubmitButton'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import { userSignUpSchema } from '@/constants'

interface FormStatus {
  message: string
  type: string
}

const SignUpForm: React.FC = () => {
  const classes = useStyles()
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: '',
    type: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const signUpUser = async (
    data: SignUpFormValues,
    helpers: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      if (data) {
        const fullName = data.firstName + ' ' + data.lastName
        await dispatch(authActions.signUp(fullName, data.email, data.password))
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
          firstName: '',
          lastName: '',
          confirmPassword: '',
        }}
        onSubmit={signUpUser}
        validationSchema={userSignUpSchema}
      >
        {(props: FormikProps<SignUpFormValues>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            dirty,
            isValid,
          } = props
          return (
            <Form>
              <h1 className={classes.title}>Sign Up</h1>
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
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    type="text"
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : 'Enter first name'
                    }
                    error={errors.firstName && touched.firstName ? true : false}
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
                    name="lastName"
                    id="lastName"
                    label="Last name"
                    value={values.lastName}
                    type="text"
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : 'Enter last name'
                    }
                    error={errors.lastName && touched.lastName ? true : false}
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
                    name="email"
                    id="emailSignUp"
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
                    id="passwordSingUp"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
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
                  className={classes.textField}
                >
                  <TextField
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    type="password"
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : 'Min 6 characters'
                    }
                    error={
                      errors.confirmPassword && touched.confirmPassword
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
                  <SubmitButton
                    disabled={isSubmitting || !dirty || !isValid}
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

export default SignUpForm
