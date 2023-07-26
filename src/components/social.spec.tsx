import { RiLinkedinBoxFill } from 'react-icons/ri'

import { render } from '@/test/test-utils'

import { Social } from './social'

describe('Social', () => {
  it('Deve renderizar o Social corretamente', () => {
    const { asFragment } = render(
      <Social href={'/'} icon={RiLinkedinBoxFill} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
