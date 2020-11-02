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

export const runParserSchema = Yup.object({
  startingPageNumber: Yup.number()
    .max(99)
    .min(0)
    .required('Please enter a number between 0-99'),
  maxNumberOfPages: Yup.number()
    .max(10)
    .min(1)
    .required('Please enter a number between 1-10'),
})

export const editFormSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('The price is required'),
  priceType: Yup.string().required('The price type is required'),
})
