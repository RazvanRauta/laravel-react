import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Advert from '@/models/advert'
import EditAdvertForm from '@/components/EditAdvertForm'
import { HOME_ROUTE } from '@/routes'

interface IState {
  adv?: Advert
}

const EditAdvertPage: React.FC = () => {
  const [adv, setAdv] = useState<Advert>()

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const adveState = (location.state as IState)?.adv
    if (adveState) {
      setAdv(adveState)
    } else {
      history.push(HOME_ROUTE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return adv ? <EditAdvertForm {...adv} /> : null
}

export default EditAdvertPage
