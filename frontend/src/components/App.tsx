/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 14:30
 */

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'
import CustomThemeProvider from '@/providers/ThemeProvider'
import Layout from '@/layout'
import { Provider } from 'react-redux'
import React from 'react'
import { routes } from '@/routes'
import store from '@/redux/store'

const routeComponents = [
  ...routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  )),
  <Redirect to="/404" key={'404-Redirect'} />,
]

const App = () => {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <Router>
          <Layout>
            <Switch>{routeComponents}</Switch>
          </Layout>
        </Router>
      </CustomThemeProvider>
    </Provider>
  )
}

export default App
