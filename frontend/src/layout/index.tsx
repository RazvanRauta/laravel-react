/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:43
 */

import React, { Fragment } from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Fragment>
  )
}

export default Layout
