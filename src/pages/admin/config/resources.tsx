import { App } from '@duxweb/dux-refine'

export const adminResources = (app: App) => {
  app.addResources([
    {
      name: 'index',
      list: 'index',
      meta: {
        label: 'dashboard',
        icon: 'i-tabler:home',
      },
    },
    {
      name: 'content',
      meta: {
        label: 'content',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'article-manage',
      meta: {
        parent: 'content',
        label: 'article-manage',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'article',
      list: 'article',
      create: 'article/create',
      meta: {
        label: 'article',
        parent: 'article-manage',
      },
    },
    {
      name: 'category',
      list: 'category',
      create: 'category/create',
      meta: {
        label: 'category',
        parent: 'article-manage',
      },
    },
    {
      name: 'system',
      meta: {
        label: 'system',
        icon: 'i-tabler:adjustments',
      },
    },
    {
      name: 'user',
      list: 'user',
      create: 'user/create',
      meta: {
        label: 'user',
        parent: 'system',
      },
    },
    {
      name: 'role',
      list: 'role',
      create: 'role/create',
      meta: {
        label: 'role',
        parent: 'system',
      },
    },

    {
      name: 'setting',
      list: 'setting',
      meta: {
        label: 'setting',
        parent: 'system',
      },
    },
    {
      name: 'permission',
      list: 'permission',
    },
  ])
}
