import { render, screen } from '@/test/test-utils'

import { Header } from './header'

describe('Header', () => {
  it('Deve renderizar o Header corretamente', () => {
    const { asFragment } = render(<Header />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId('logo')).toBeVisible()
  })
})
