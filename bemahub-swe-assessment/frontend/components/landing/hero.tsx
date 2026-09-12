export function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-bg py-12 sm:py-16 lg:py-20">
      
      {/* Decorative Study Doodles (Background Accents) */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Top-Left Planet Icon */}
        <div className="absolute left-[5%] top-6 opacity-60 sm:top-10">
          <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="6" />
            <path d="M4 12c0-2.5 3.5-5 8-5s8 2.5 8 5-3.5 5-8 5-8-2.5-8-5z" transform="rotate(-25 12 12)" />
          </svg>
        </div>

        {/* Top-Left Small Orange Accent Circle */}
        <div className="absolute left-[2%] top-16 h-3 w-3 rounded-full border-2 border-tag-orange-text opacity-70" />

        {/* Left Dot Grid Pattern */}
        <div className="absolute left-[3%] top-28 hidden opacity-30 sm:block">
          <div 
            className="h-16 w-16" 
            style={{ 
              backgroundImage: "radial-gradient(var(--color-accent) 1.5px, transparent 1.5px)", 
              backgroundSize: "8px 8px" 
            }} 
          />
        </div>

        {/* Bottom-Center Floating Book/Notepad */}
        <div className="absolute bottom-4 left-[45%] opacity-50 sm:bottom-8">
          <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
          </svg>
        </div>

        {/* Bottom-Right Triangle Set Square / Ruler */}
        <div className="absolute bottom-6 right-[8%] opacity-60 sm:bottom-10">
          <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 20L4 4V20Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16L14 16L8 10V16Z" />
          </svg>
        </div>

        {/* Top-Right Circle Accent */}
        <div className="absolute right-[6%] top-8 h-4 w-4 rounded-full border-2 border-tag-orange-text opacity-60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Content Side */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Bema Learn
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:leading-tight">
              Start learning from top instructors worldwide
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Flexible, easy-to-access learning opportunities designed to help you build real skills, master key concepts, and advance with confidence.
            </p>

            {/* Search Bar */}
            <div className="mt-6 flex max-w-lg items-center rounded-xl border border-border-strong bg-surface p-1.5 shadow-sm">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="w-full bg-transparent px-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none sm:text-sm"
              />
              <button className="flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-semibold text-surface transition-colors hover:bg-accent-hover">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Right Side: Clean Vector Illustration */}
          <div className="flex items-center justify-center lg:col-span-6 lg:justify-end">
            <div className="relative w-full max-w-lg">
              <svg
                viewBox="0 0 500 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full"
              >
                {/* Background Organic Color Splashes */}
                <ellipse cx="250" cy="220" rx="190" ry="120" fill="var(--color-accent-soft)" />
                <circle cx="380" cy="110" r="45" fill="var(--color-tag-blue-bg)" opacity="0.6" />
                
                {/* Desk / Platform */}
                <rect x="70" y="280" width="360" height="8" rx="4" fill="var(--color-text-primary)" opacity="0.8" />

                {/* Main Screen/Monitor Frame */}
                <rect x="130" y="80" width="240" height="160" rx="12" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="4" />
                <rect x="145" y="95" width="210" height="115" rx="6" fill="var(--color-accent-soft)" />
                <rect x="225" y="240" width="50" height="40" fill="var(--color-text-primary)" />
                <path d="M 200 280 L 300 280" stroke="var(--color-text-primary)" strokeWidth="6" strokeLinecap="round" />

                {/* Dashboard Elements on Screen */}
                <rect x="160" y="110" width="80" height="12" rx="3" fill="var(--color-accent)" />
                <rect x="160" y="130" width="120" height="8" rx="2" fill="var(--color-text-muted)" opacity="0.5" />
                <rect x="160" y="145" width="100" height="8" rx="2" fill="var(--color-text-muted)" opacity="0.3" />
                
                <circle cx="310" cy="140" r="22" fill="var(--color-accent)" opacity="0.2" />
                <path d="M 302 140 L 320 140 M 311 131 L 311 149" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />

                {/* Floating Card Badge */}
                <g className="animate-bounce" style={{ animationDuration: "4s" }}>
                  <rect x="70" y="120" width="70" height="50" rx="8" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="2" />
                  <path d="M 85 140 L 125 140" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 85 150 L 110 150" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Student / Person Illustration */}
                <path d="M 320 280 C 320 230, 360 220, 380 220 C 400 220, 430 230, 430 280 Z" fill="var(--color-text-primary)" />
                <circle cx="375" cy="185" r="22" fill="var(--color-accent)" />
                <path d="M 360 175 C 370 165, 385 165, 390 175" stroke="var(--color-surface)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}