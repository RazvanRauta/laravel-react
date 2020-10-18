/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 14:30
 */

import Layout from '@/layout'
import CustomThemeProvider from '@/providers/ThemeProvider'
import { routes } from '@/routes'
import { CssBaseline } from '@material-ui/core'
import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

const routeComponents = [
  ...routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  )),
  <Redirect to="/404" key={'404-Redirect'} />,
]

const App = () => {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Router>
        <Layout>
          <Switch>{routeComponents}</Switch>
        </Layout>
      </Router>
    </CustomThemeProvider>
  )
}

export default App
