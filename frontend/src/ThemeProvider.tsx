import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const createTheme = (nightMode: boolean) =>
  createMuiTheme({
    palette: {
      type: nightMode === true ? 'dark' : 'light',
      primary: {
        light: '#b2b9e1',
        main: '#9fa8da',
        dark: '#6f7598',
        contrastText: '#fff',
      },
      secondary: {
        light: '#9bc0ff',
        main: '#82b1ff',
        dark: '#5b7bb2',
        contrastText: '#000',
      },
    },
  })

export const CustomThemeContext = React.createContext({
  nightMode: false,
  toggleNightMode: () => {},
})

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = localStorage.getItem('nightMode') || 'false'
  const [nightMode, setNightMode] = React.useState<boolean>(JSON.parse(currentTheme))

  const theme = createTheme(nightMode)

  const toggleNightMode = () => {
    localStorage.setItem('nightMode', JSON.stringify(!nightMode))
    setNightMode((prevMode) => !prevMode)
  }

  return (
    <CustomThemeContext.Provider
      value={{
        nightMode,
        toggleNightMode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}
