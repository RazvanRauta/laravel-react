/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:14
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyIndexPage = lazy(() => import('./IndexPage'))

const IndexPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyIndexPage {...props} />
  </Suspense>
)

export default IndexPage
