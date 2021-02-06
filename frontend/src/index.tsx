import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { CustomThemeProvider } from './ThemeProvider'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
