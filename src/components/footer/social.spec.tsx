import { RiLinkedinBoxFill } from 'react-icons/ri'

import { render, screen } from '@/test/test-utils'

import { Social } from './social'

describe('Teste Unitário - Social', () => {
  it('Deve renderizar o Social corretamente', () => {
    const href = 'https://www.linkedin.com'
    const { asFragment } = render(<Social href={href} icon={RiLinkedinBoxFill} />)

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByRole('link')).toHaveAttribute('href', href)
    expect(screen.getByTestId('social-icon')).toBeVisible()
  })
})
