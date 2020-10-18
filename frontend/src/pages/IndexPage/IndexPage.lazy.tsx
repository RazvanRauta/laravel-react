/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:14
 */

import Loader from '@/components/Loader'
import React, { lazy, Suspense } from 'react'

const LazyIndexPage = lazy(() => import('./IndexPage'))

const IndexPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyIndexPage {...props} />
  </Suspense>
)

export default IndexPage
