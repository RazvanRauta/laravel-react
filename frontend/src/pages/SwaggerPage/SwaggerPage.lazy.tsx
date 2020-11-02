/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:13
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazySwaggerPage = lazy(() => import('./SwaggerPage'))

const SwaggerPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazySwaggerPage {...props} />
  </Suspense>
)

export default SwaggerPage
