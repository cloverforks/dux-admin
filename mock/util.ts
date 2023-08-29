import path from 'node:path'
import { createDefineMock, MockHttpItem } from 'vite-plugin-mock-dev-server'

export const defineAPIMock = createDefineMock((mock) => {
  mock = mock as MockHttpItem
  mock.url = path.join('/api', mock.url)
  mock.type = 'json'
})

export const send = (code: number, message: string, data?: Record<string, any>) => {
  return JSON.stringify({
    code,
    message,
    data: data || [],
  })
}

export const validate = (data: Record<string, any>, rules: Record<string, string>) => {
  const errors: Record<string, string[]> = {}
  for (const key in rules) {
    if (!data[key]) {
      errors[key] = [rules[key]]
    }
  }
  if (Object.keys(errors).length) {
    return send(422, 'Incomplete information', [errors])
  }
  return true
}
