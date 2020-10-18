import IndexPage from '@/pages/IndexPage/IndexPage.lazy'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.lazy'

export const routes = [
  { path: '/', component: IndexPage },
  { path: '/404', component: NotFoundPage },
]
