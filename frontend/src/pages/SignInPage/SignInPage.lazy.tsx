/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:52
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazySignInPage = lazy(() => import('./SignInPage'))

const SignInPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazySignInPage {...props} />
  </Suspense>
)

export default SignInPage
