import { defineMockData } from 'vite-plugin-mock-dev-server'
import MockData from './data'

export default defineMockData('database', () => {
  return MockData.getInstance()
})
