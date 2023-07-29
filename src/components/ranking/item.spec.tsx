import { render, screen } from '@/test/test-utils'

import ListItem from './item'

describe('Teste Unitário - ListItem', () => {
  it('Deve renderizar o ListItem corretamente', async () => {
    const mock = {
      index: 3,
      id: 21,
      title: 'Naruto',
    }

    const { asFragment } = render(<ListItem {...mock} />)

    expect(asFragment()).toMatchSnapshot()

    const linkElement = screen.getByText('4. Naruto')

    expect(screen.getByTestId('list-item')).toBeVisible()
    expect(linkElement).toHaveAttribute('href', '/anime/21')
  })
})
