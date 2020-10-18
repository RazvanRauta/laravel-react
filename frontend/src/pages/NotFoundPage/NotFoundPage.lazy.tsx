/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:13
 */

import Loader from '@/components/Loader'
import React, { lazy, Suspense } from 'react'

const LazyNotFoundPage = lazy(() => import('./NotFoundPage'))

const NotFoundPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyNotFoundPage {...props} />
  </Suspense>
)

export default NotFoundPage
