import { Logo } from "./logo";

export function Header() {
  return (
    <header className="p-4 bg-neutral-800 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl">
        <Logo />
      </div>
    </header>
  );
}
