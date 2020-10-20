import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark', // Name of the theme
    primary: {
      main: '#152B38',
      dark:
        'linear-gradient(45deg, rgba(4, 23, 92, 0.45) 0%, rgba(4, 23, 92, 0.45) 25%,rgba(23, 46, 132, 0.45) 25%, rgba(23, 46, 132, 0.45) 50%,rgba(42, 70, 173, 0.45) 50%, rgba(42, 70, 173, 0.45) 75%,rgba(61, 93, 213, 0.45) 75%, rgba(61, 93, 213, 0.45) 100%),linear-gradient(135deg, rgb(8, 63, 29) 0%, rgb(8, 63, 29) 25%,rgb(39, 70, 68) 25%, rgb(39, 70, 68) 50%,rgb(69, 77, 107) 50%, rgb(69, 77, 107) 75%,rgb(100, 84, 146) 75%, rgb(100, 84, 146) 100%)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#272c34',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

// export const lightTheme = createMuiTheme({
//   palette: {
//     type: 'light', // Name of the theme
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       contrastText: '#000',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// })
