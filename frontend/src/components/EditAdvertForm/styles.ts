/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 02 2020
 * @ Time: 20:45
 */

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '850px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      marginTop: '20px',
      '& > *': {
        width: '100%',
      },
    },
    priceContainer: {
      marginTop: '20px',
    },
    price: {
      marginRight: '40px',
      '& > *': {
        width: '100px',
      },
    },
    priceType: {
      '& > *': {
        width: '150px',
      },
    },
    descriptionField: {
      marginTop: '20px',
      '& > *': {
        width: '100%',
      },
      '& textarea': {
        lineHeight: '25px',
        overflow: 'auto !important',
      },
    },
    submitButton: {
      marginTop: '24px',
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      marginBottom: 0,
      padding: 0,
    },
    successMessage: {
      color: 'green',
    },
    errorMessage: {
      color: 'red',
    },
    helperText: {
      marginTop: 20,
    },
  })
)

export default useStyles
