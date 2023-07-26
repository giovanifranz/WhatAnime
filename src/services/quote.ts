type Quote = {
  anime: string
  character: string
  quote: string
}

export const getRandomQuote = async (): Promise<Quote> => {
  const res = await fetch('https://animechan.xyz/api/random')
  return await res.json()
}
