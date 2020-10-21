/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:46
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazySettingsPage = lazy(() => import('./SettingsPage'))

const SettingsPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazySettingsPage {...props} />
  </Suspense>
)

export default SettingsPage
