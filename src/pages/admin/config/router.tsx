import { App, lazyComponent } from '@duxweb/dux-refine'

import { Navigate } from 'react-router-dom'
import Index from '../home'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      element: <Navigate to='index' />,
    },
    {
      path: 'index',
      element: <Index />,
    },
    {
      path: 'setting',
      element: <Index />,
    },
    {
      path: 'article',
      children: [
        {
          index: true,
          element: lazyComponent(() => import('../article/list')),
        },
      ],
    },
    {
      path: 'category',
      children: [
        {
          index: true,
          element: lazyComponent(() => import('../category/list')),
        },
      ],
    },
    {
      path: 'role',
      children: [
        {
          index: true,
          element: lazyComponent(() => import('../role/list')),
        },
      ],
    },
    {
      path: 'user',
      children: [
        {
          index: true,
          element: lazyComponent(() => import('../user/list')),
        },
      ],
    },
    {
      path: 'setting',
      children: [
        {
          index: true,
          element: lazyComponent(() => import('../setting/page')),
        },
      ],
    },
  ])
}
