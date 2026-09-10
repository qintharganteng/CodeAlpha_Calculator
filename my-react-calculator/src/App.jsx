import Calculator from "./components/Calculator"

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070709] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[130px]" />

        <div className="absolute -right-40 top-[20%] h-[460px] w-[460px] rounded-full bg-blue-500/15 blur-[150px]" />

        <div className="absolute bottom-[-220px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[160px]" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 md:px-10">
        <header className="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-[3px]">
              <span className="h-[5px] w-[5px] rounded-full bg-white" />
              <span className="h-[5px] w-[5px] rounded-full bg-white/35" />
              <span className="h-[5px] w-[5px] rounded-full bg-white/35" />
              <span className="h-[5px] w-[5px] rounded-full bg-white" />
            </div>

            <span className="text-sm font-medium tracking-[-0.02em]">
              CodeAlpha
            </span>
          </div>

          <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
            Task 02 / Calculator
          </span>
        </header>

        <section className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/35">
              Frontend Development
            </p>

            <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.055em] md:text-7xl">
              Simple math.
              <br />
              <span className="text-white/35">
                Refined experience.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-6 text-white/40 md:text-base">
              A responsive calculator designed
              with a minimal interface,
              glass-inspired surfaces, and
              seamless keyboard interaction.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "React",
                "Vite",
                "JavaScript",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-white/45"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Calculator />
        </section>

        <footer className="flex items-center justify-between border-t border-white/[0.08] pt-5 text-[10px] uppercase tracking-[0.18em] text-white/20">
          <span>CodeAlpha Internship</span>
          <span>2026</span>
        </footer>
      </div>
    </main>
  )
}

export default App