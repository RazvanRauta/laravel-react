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
import { protectedRoutes, routes } from '@/routes'

import { CssBaseline } from '@material-ui/core'
import CustomThemeProvider from '@/providers/ThemeProvider'
import Layout from '@/layout'
import { PersistGate } from 'redux-persist/integration/react'
import ProtectedRoute from './ProtectedRoute'
import { Provider } from 'react-redux'
import React from 'react'
import { persistor } from '@/redux/store'
import store from '@/redux/store'

const routeComponents = [
  ...routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  )),
  ...protectedRoutes.map(({ path, component }, key) => (
    <ProtectedRoute key={key} path={path} component={component} />
  )),
  <Redirect to="/404" key={'404-Redirect'} />,
]

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CustomThemeProvider>
          <CssBaseline />
          <Router>
            <Layout>
              <Switch>{routeComponents}</Switch>
            </Layout>
          </Router>
        </CustomThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
