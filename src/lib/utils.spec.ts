import { isDevEnvironment, isMockEnabled } from './utils'

afterEach(() => {
  delete process.env.NEXT_PUBLIC_API_MOCKING
})

describe('utils', () => {
  describe(isDevEnvironment.name, () => {
    it('Deve retornar false quando o ambiente for de test', () => {
      expect(isDevEnvironment()).toBeFalsy()
    })
  })

  describe(isMockEnabled.name, () => {
    it('Deve retornar true quando o mocking estiver habilitado', () => {
      process.env.NEXT_PUBLIC_API_MOCKING = 'enabled'
      expect(isMockEnabled()).toBeTruthy()
    })

    it('Deve retornar false quando o mocking não estiver habilitado', () => {
      process.env.NEXT_PUBLIC_API_MOCKING = 'disabled'
      expect(isMockEnabled()).toBeFalsy()

      process.env.NEXT_PUBLIC_API_MOCKING = undefined
      expect(isMockEnabled()).toBeFalsy()
    })
  })
})
