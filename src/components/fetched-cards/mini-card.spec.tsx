import { render, screen } from '@/test/test-utils'

import MiniCard from './mini-card'

describe('Teste Unitário - MiniCard', () => {
  it('Deve renderizar o MiniCard corretamente', async () => {
    const mock = {
      title: 'naruto',
      image: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    }

    const { asFragment } = render(<MiniCard {...mock} />)

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText(new RegExp(mock.title, 'i'))).toBeVisible()
    expect(screen.getByTestId('mini-card')).toHaveStyle({
      backgroundImage: mock.image,
    })
  })
})
