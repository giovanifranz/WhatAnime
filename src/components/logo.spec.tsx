import { render } from '@/test/test-utils'

import { Logo } from './logo'

describe('Logo', () => {
  it('Deve renderizar o Logo corretamente', () => {
    const { asFragment } = render(<Logo />)
    expect(asFragment()).toMatchSnapshot()
  })
})
