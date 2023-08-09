import { Authenticated, ErrorComponent, Refine } from '@refinedev/core'
import type {
  I18nProvider,
  AuthBindings,
  ResourceProps,
  NotificationProvider,
} from '@refinedev/core'
import { ComponentType, Suspense, lazy, useCallback, useMemo } from 'react'
import { NotificationPlugin, NotificationInstance, Button } from 'tdesign-react/esm'
import { RouteObject, Outlet } from 'react-router-dom'
import routerBindings, { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6'
import { Layout } from '../components/layout'
import { ForgotPassword } from '../pages/admin/forgotPassword'
import { Login } from '../pages/admin/login'
import { Register } from '../pages/admin/register'
import config from '../config'
import { dataProvider } from '@/provider/dataProvider'

export const lazyComponent = (importComp: () => Promise<{ default: ComponentType<any> }>) => {
  const Comp = lazy(importComp)
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Comp></Comp>
    </Suspense>
  )
}

export interface createRefineProps {
  name: string
  prefix?: string
  i18nProvider: I18nProvider
  authProvider: AuthBindings
  router: RouteObject[]
  resources: ResourceProps[]
}

export const createRefine = ({
  name,
  prefix,
  i18nProvider,
  authProvider,
  router,
  resources,
}: createRefineProps): RouteObject => {
  const notifyMaps: Record<string, Promise<NotificationInstance>> = {}

  const notificationProvider: NotificationProvider = {
    open: ({ message, description, key, type, cancelMutation, undoableTimeout }) => {
      const notifyConfig = {
        title: message,
        content: description,
        offset: [-20, 20],
        closeBtn: true,
        onCloseBtnClick: () => {
          if (key) {
            delete notifyMaps[key]
          }
        },
        onDurationEnd: () => {
          if (key) {
            delete notifyMaps[key]
          }
        },
      }

      if (type === 'success') {
        const msg = NotificationPlugin.success(notifyConfig)
        if (key) {
          notifyMaps[key] = msg
        }
      }
      if (type === 'error') {
        const msg = NotificationPlugin.error(notifyConfig)
        if (key) {
          notifyMaps[key] = msg
        }
      }
      if (type === 'progress') {
        const msg = NotificationPlugin.warning({
          ...notifyConfig,
          closeBtn: false,
          footer: (
            <div slot='footer'>
              <Button theme='default' variant='text' onClick={cancelMutation}>
                撤销
              </Button>
            </div>
          ),
          duration: undoableTimeout,
        })
        if (key) {
          notifyMaps[key] = msg
        }
      }
    },
    close: (key) => {
      if (Object.prototype.hasOwnProperty.call(notifyMaps, key)) {
        NotificationPlugin.close(notifyMaps[key])
      }
    },
  }

  return {
    path: prefix,
    element: (
      <Refine
        dataProvider={dataProvider(name, config.apiUrl)}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        routerProvider={routerBindings}
        notificationProvider={notificationProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: config.projectId,
        }}
      >
        <Outlet />
      </Refine>
    ),
    children: [
      {
        element: (
          <Authenticated fallback={<CatchAllNavigate to='login' />}>
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        ),
        children: [
          ...router,
          {
            path: '*',
            element: <ErrorComponent />,
          },
        ],
      },
      {
        element: (
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        ),
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  }
}
