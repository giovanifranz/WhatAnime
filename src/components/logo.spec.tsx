import { render, screen } from '@/test/test-utils'

import { Logo } from './logo'

describe('Teste Unitário - Logo', () => {
  it('Deve renderizar o Logo corretamente', () => {
    const { asFragment } = render(<Logo />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId('logo')).toBeVisible()
  })
})
