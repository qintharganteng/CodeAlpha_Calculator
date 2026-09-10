import { formatDisplay } from "../utils/calculate"

function Display({
  expression,
  value,
  preview,
}) {
  const formattedValue = formatDisplay(value)

  const displaySize =
    formattedValue.length > 12
      ? "text-4xl md:text-5xl"
      : formattedValue.length > 8
        ? "text-5xl md:text-6xl"
        : "text-6xl md:text-7xl"

  return (
    <div className="mb-6 flex min-h-[190px] flex-col justify-between rounded-[26px] border border-white/[0.06] bg-black/20 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
          Calculator
        </span>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />

          <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
            Active
          </span>
        </div>
      </div>

      <div className="mt-10 text-right">
        <p className="min-h-5 text-sm font-light tracking-wide text-white/35">
          {expression || "Ready"}
        </p>

        <div
          className={`${displaySize} mt-2 overflow-hidden font-light tracking-[-0.055em] text-white`}
        >
          {formattedValue}
        </div>

        <p className="mt-2 min-h-5 text-sm text-white/35">
          {preview}
        </p>
      </div>
    </div>
  )
}

export default Display