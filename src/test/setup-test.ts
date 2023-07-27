import { server } from '@/mocks/server'
import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

process.env.NEXT_PUBLIC_API_MOCKING = 'enabled'

expect.extend(matchers)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

beforeAll(() => {
  server.listen()
  vi.mock('next/router', () => import('next-router-mock'))
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())
