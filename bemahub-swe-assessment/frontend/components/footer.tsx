import Link from "next/link";

export function LandingFooter() {
  return (
    <section className="w-full">
      {/* Dark CTA Section */}
      <div className="relative w-full bg-slate-900 text-slate-100">
        <div className="relative mx-auto max-w-5xl overflow-hidden px-6 py-16 text-center sm:py-20">
          
          {/* Subtle Ambient Glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-accent/10 blur-3xl" 
          />

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Start learning today
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Build skills that move you forward.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Explore courses, track your progress, and keep growing with Bema Learn.
            </p>

            <Link
              href="/courses"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-surface px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-slate-100"
            >
              <span>Explore courses</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Standard Theme Footer Bar */}
      <footer className="border-t border-border bg-bg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <p className="text-xs text-text-secondary">
            © 2026 Bema Learn
          </p>

          <p className="text-xs text-text-secondary">
            Learn. Grow. Build.
          </p>
        </div>
      </footer>
    </section>
  );
}