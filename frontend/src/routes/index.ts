/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 13:32
 */

import AdvertPage from '@/pages/AdvertPage/AdvertPage.lazy'
import IndexPage from '@/pages/IndexPage/IndexPage.lazy'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.lazy'
import SettingsPage from '@/pages/SettingsPage/SettingsPage.lazy'
import SignInPage from '@/pages/SignInPage/SignInPage.lazy'

export const HOME_ROUTE = '/'
export const PAGE_ID_ROUTE = '/page/:id'
export const ADVERT_ID_ROUTE = '/adv/:id'
export const SIGN_IN_ROUTE = '/signin'
export const SETTINGS_ROUTE = '/settings'
export const NOT_FOUND_ROUTE = '/404'

export const routes = [
  { path: HOME_ROUTE, component: IndexPage },
  { path: PAGE_ID_ROUTE, component: IndexPage },
  { path: ADVERT_ID_ROUTE, component: AdvertPage },
  { path: SIGN_IN_ROUTE, component: SignInPage },
  { path: SETTINGS_ROUTE, component: SettingsPage },
  { path: NOT_FOUND_ROUTE, component: NotFoundPage },
]
