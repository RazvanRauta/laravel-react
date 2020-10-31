import * as Yup from 'yup'

export const userSignUpSchema = Yup.object({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string().email().required('Please enter a valid email'),
  password: Yup.string().min(6).required('Min 6 characters'),
  confirmPassword: Yup.string()
    .required('Required')
    .test('password-match', 'Password must match', function (value) {
      return this.parent.password === value
    }),
})

export const userSignInSchema = Yup.object({
  email: Yup.string().email().required('Please enter a valid email'),
  password: Yup.string()
    .min(6)
    .required('Please valid password of min 6 characters'),
})
