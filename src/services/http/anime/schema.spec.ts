import schemaWithoutWebp from '@/mocks/handlers/anime/schema-without-webp.json'

import { AnimeSchema } from './schema'

describe('AnimeSchema', () => {
  it('Deve retornar como image a versão JPG caso não possua WEBP', () => {
    const validate = AnimeSchema.safeParse(schemaWithoutWebp.data)
    expect(validate.success).toBe(true)

    if (validate.success) {
      expect(validate.data.image).toBe(
        'https://cdn.myanimelist.net/images/anime/9/28323.jpg',
      )
    }
  })

  it('Deve retornar placeholder caso não possua imagens', () => {
    const validate = AnimeSchema.safeParse({
      ...schemaWithoutWebp.data,
      images: null,
    })
    expect(validate.success).toBe(true)

    if (validate.success) {
      expect(validate.data.image).toBe('/placeholder.png')
    }
  })
})
