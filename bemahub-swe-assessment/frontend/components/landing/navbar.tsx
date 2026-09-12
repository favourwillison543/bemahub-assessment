import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-text-primary"
        >
          Bema Learn
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/courses"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Courses
          </Link>

          <Link
            href="/login"
            className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

