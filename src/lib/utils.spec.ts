import { isDevEnvironment, isMockEnabled, processAndConvertToLowerCase } from './utils'

afterEach(() => {
  delete process.env.NEXT_PUBLIC_API_MOCKING
})

describe('Teste Unitário - utils', () => {
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

  describe(processAndConvertToLowerCase.name, () => {
    it('Deve retornar a string em minúsculas sem caracteres especiais', () => {
      const input = '  Olá, Mundo!  '
      const expectedOutput = 'ola mundo'
      const result = processAndConvertToLowerCase(input)

      expect(result).toBe(expectedOutput)
    })

    it('Deve retornar a string em minúsculas e sem caracteres especiais (exceto espaço)', () => {
      const input = 'Th1$ 1s @ T3st  '
      const expectedOutput = 'th1 1s t3st'
      const result = processAndConvertToLowerCase(input)
      expect(result).toBe(expectedOutput)
    })

    it('Deve retornar uma string vazia para uma string contendo apenas caracteres especiais', () => {
      const input = '!@#$%^&*()_+'
      const expectedOutput = ''
      const result = processAndConvertToLowerCase(input)
      expect(result).toBe(expectedOutput)
    })

    it('Deve retornar uma string vazia para uma string vazia', () => {
      const input = ''
      const expectedOutput = ''
      const result = processAndConvertToLowerCase(input)
      expect(result).toBe(expectedOutput)
    })
  })
})
