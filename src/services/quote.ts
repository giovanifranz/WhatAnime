export type Quote = {
  anime: string
  character: string
  quote: string
}

export const getRandomQuote = async (): Promise<Quote> => {
  const res = await fetch('https://animechan.xyz/api/random', {
    next: { revalidate: 60 * 60 * 24 },
  })
  return await res.json()
}
