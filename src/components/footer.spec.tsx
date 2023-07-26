import { render } from '@/test/test-utils'

import { Footer } from './footer'

describe('Footer', () => {
  it('Deve renderizar o Footer corretamente', () => {
    const { asFragment } = render(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
