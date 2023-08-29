import { Config } from '@duxweb/dux-refine'

const config: Config = {
  projectId: '',
  apiUrl: '/api',
  apiPath: {
    login: 'login',
    check: 'check',
    register: 'register',
    forgotPassword: 'forgot-password',
    updatePassword: 'update-password',
    upload: 'upload',
  },
  defaultApp: 'admin',
  resourcesPrefix: false,
  moduleApp: {
    admin: {
      register: true,
      forgotPassword: true,
    },
  },
}
export default config
