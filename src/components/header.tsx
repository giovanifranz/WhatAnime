import { Logo } from './logo'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-neutral-800 p-4">
      <div className="mx-auto max-w-7xl">
        <Logo />
      </div>
    </header>
  )
}
