function CalculatorButton({
  children,
  onClick,
  variant = "number",
  wide = false,
  active = false,
  ariaLabel,
}) {
  const variants = {
    number:
      "border-white/10 bg-white/[0.07] text-white hover:bg-white/[0.13]",

    function:
      "border-white/10 bg-white/[0.12] text-white/80 hover:bg-white/[0.18]",

    operator:
      "border-white/10 bg-white/[0.12] text-white hover:bg-white/[0.20]",

    equals:
      "border-white/20 bg-white text-black hover:bg-white/90",
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`
        relative flex h-[68px]
        items-center justify-center
        rounded-[22px]
        border
        text-lg font-medium
        backdrop-blur-xl
        transition-all
        duration-200
        ease-out
        active:scale-[0.94]
        ${wide ? "col-span-2" : ""}
        ${variants[variant]}
        ${
          active
            ? "!bg-white !text-black"
            : ""
        }
      `}
    >
      {children}
    </button>
  )
}

export default CalculatorButton