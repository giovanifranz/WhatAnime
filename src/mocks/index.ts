async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('@/mocks/server')
    server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    const { worker } = await import('@/mocks/browser')
    worker.start({ onUnhandledRequest: 'bypass' })
  }
}

initMocks()

export {}
