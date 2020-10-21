/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:52
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyAdvertPage = lazy(() => import('./AdvertPage'))

const AdvertPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyAdvertPage {...props} />
  </Suspense>
)

export default AdvertPage
