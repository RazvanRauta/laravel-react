/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 15:38
 */

import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles/'
import { darkTheme } from '@/theme'

const getThemeByName = (theme: string) => {
  return themeMap[theme]
}

const themeMap: { [key: string]: any } = {
  darkTheme,
}

export const ThemeContext = React.createContext(getThemeByName('darkTheme'))

const CustomThemeProvider: React.FC = (props) => {
  // State to hold the selected theme name

  const [themeName, _setThemeName] = useState('darkTheme')

  // Retrieve the theme object by theme name
  const theme = getThemeByName(themeName)

  return (
    <ThemeContext.Provider value={_setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default CustomThemeProvider
