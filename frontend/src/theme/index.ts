import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark', // Name of the theme
    primary: {
      main: '#152B38',
      dark: '#002884',
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
