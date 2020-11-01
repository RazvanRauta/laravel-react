import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyEditAdvertPage = lazy(() => import('./EditAdvertPage'))

const EditAdvertPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyEditAdvertPage {...props} />
  </Suspense>
)

export default EditAdvertPage
