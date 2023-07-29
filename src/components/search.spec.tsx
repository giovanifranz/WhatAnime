import { render, screen } from '@/test/test-utils'

import { Search } from './search'

describe('Teste Unitário - Search', () => {
  it('Deve renderizar o Search corretamente', async () => {
    const { asFragment } = render(<Search />)

    expect(asFragment()).toMatchSnapshot()

    const inputName = screen.getByPlaceholderText(/Enter your search key word/i)

    expect(inputName).toBeVisible()
  })
})
