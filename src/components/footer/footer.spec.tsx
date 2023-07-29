import { render, screen } from '@/test/test-utils'

import { Footer } from './footer'

describe('Footer', () => {
  it('Deve renderizar o Footer corretamente', () => {
    const { asFragment } = render(<Footer />)

    expect(asFragment()).toMatchSnapshot()

    const myAnimeListElement = screen.getByTestId('myanimelist-social')
    const anilistElement = screen.getByTestId('anilist-social')
    const facebookElement = screen.getByTestId('facebook-social')
    const twitterElement = screen.getByTestId('twitter-social')
    const paypal = screen.getByTestId('paypal')
    const highlander = screen.getByTestId('highlander-logo')

    expect(screen.getByTestId('logo')).toBeVisible()

    expect(myAnimeListElement).toHaveAttribute(
      'href',
      'https://myanimelist.net/profile/HighlanderTech',
    )

    expect(anilistElement).toHaveAttribute(
      'href',
      'https://anilist.co/user/giovanifranz/',
    )

    expect(facebookElement).toHaveAttribute(
      'href',
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.whatanime.com.br',
    )

    expect(twitterElement).toHaveAttribute(
      'href',
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.whatanime.com.br',
    )

    expect(paypal).toHaveAttribute(
      'href',
      'https://www.paypal.com/donate/?hosted_button_id=KJ9TK628E7N42',
    )

    expect(highlander).toHaveAttribute('href', 'https://www.highlandertech.com.br')
  })
})
//
