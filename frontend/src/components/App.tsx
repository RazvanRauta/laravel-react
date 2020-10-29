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
import { Helmet } from 'react-helmet'
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
            <Helmet>
              <meta name="”robots”" content="noindex, nofollow" />
              <meta property="og:site_name" content="Amazing Real Estates" />
              <link rel="canonical" href="https://ama.rrazvan.dev" />
              <meta property="og:url" content="https://ama.rrazvan.dev" />
              <meta
                property="og:image"
                content="https://ama.rrazvan.dev/meta.png"
              />
              <title>Amazing Real Estates</title>
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Amazing Real Estate" />
              <meta
                property="og:description"
                content="The most amazing app you will ever see"
              />
              <meta
                name="description"
                content="The most amazing app you will ever see"
              />
              <meta property="og:url" content="https://ama.rrazvan.dev" />
              <meta property="og:image:type" content="image/png" />
              <meta property="og:image:width" content="1800" />
              <meta property="og:image:height" content="976" />
            </Helmet>
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
