import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import CalculatorButton from "./Calculatorbutton"
import Display from "./Display"

import {
  calculate,
  formatDisplay,
  operatorSymbols,
} from "../utils/calculate"

function Calculator() {
  const [display, setDisplay] = useState("0")
  const [firstValue, setFirstValue] =
    useState(null)
  const [operator, setOperator] =
    useState(null)
  const [
    waitingForOperand,
    setWaitingForOperand,
  ] = useState(false)

  const [expression, setExpression] =
    useState("")

  const handleDigit = useCallback(
    (digit) => {
      if (display === "Error") {
        setDisplay(digit)
        setWaitingForOperand(false)
        return
      }

      const digitCount = display
        .replace("-", "")
        .replace(".", "").length

      if (
        digitCount >= 12 &&
        !waitingForOperand
      ) {
        return
      }

      if (
        waitingForOperand ||
        display === "0"
      ) {
        setDisplay(digit)
        setWaitingForOperand(false)
      } else {
        setDisplay((current) =>
          current + digit
        )
      }
    },
    [display, waitingForOperand]
  )

  const handleDecimal = useCallback(() => {
    if (display === "Error") {
      setDisplay("0.")
      setWaitingForOperand(false)
      return
    }

    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay((current) =>
        `${current}.`
      )
    }
  }, [display, waitingForOperand])

  const handleClear = useCallback(() => {
    setDisplay("0")
    setFirstValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setExpression("")
  }, [])

  const handleDelete = useCallback(() => {
    if (
      waitingForOperand ||
      display === "Error"
    ) {
      return
    }

    if (
      display.length === 1 ||
      (display.length === 2 &&
        display.startsWith("-"))
    ) {
      setDisplay("0")
      return
    }

    setDisplay((current) =>
      current.slice(0, -1)
    )
  }, [display, waitingForOperand])

  const handleToggleSign = useCallback(() => {
    if (
      display === "0" ||
      display === "Error"
    ) {
      return
    }

    setDisplay((current) =>
      current.startsWith("-")
        ? current.slice(1)
        : `-${current}`
    )
  }, [display])

  const handlePercent = useCallback(() => {
    if (display === "Error") {
      return
    }

    const result =
      Number(display) / 100

    setDisplay(
      Number.parseFloat(
        result.toFixed(10)
      ).toString()
    )
  }, [display])

  const handleOperator = useCallback(
    (nextOperator) => {
      if (display === "Error") {
        return
      }

      const inputValue = Number(display)
      let baseValue = firstValue

      if (baseValue === null) {
        baseValue = inputValue
        setFirstValue(inputValue)
      } else if (
        operator &&
        !waitingForOperand
      ) {
        const result = calculate(
          baseValue,
          inputValue,
          operator
        )

        if (result === "Error") {
          setDisplay("Error")
          setExpression(
            "Cannot divide by zero"
          )
          setFirstValue(null)
          setOperator(null)
          setWaitingForOperand(true)
          return
        }

        baseValue = Number(result)

        setDisplay(result)
        setFirstValue(baseValue)
      }

      setOperator(nextOperator)
      setWaitingForOperand(true)

      setExpression(
        `${formatDisplay(baseValue)} ${
          operatorSymbols[nextOperator]
        }`
      )
    },
    [
      display,
      firstValue,
      operator,
      waitingForOperand,
    ]
  )

  const handleEquals = useCallback(() => {
    if (
      firstValue === null ||
      !operator ||
      waitingForOperand ||
      display === "Error"
    ) {
      return
    }

    const secondValue = Number(display)

    const result = calculate(
      firstValue,
      secondValue,
      operator
    )

    setExpression(
      `${formatDisplay(firstValue)} ${
        operatorSymbols[operator]
      } ${formatDisplay(secondValue)} =`
    )

    setDisplay(result)
    setFirstValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }, [
    display,
    firstValue,
    operator,
    waitingForOperand,
  ])

  const liveResult = useMemo(() => {
    if (
      firstValue === null ||
      !operator ||
      waitingForOperand ||
      display === "Error"
    ) {
      return ""
    }

    const result = calculate(
      firstValue,
      Number(display),
      operator
    )

    if (result === "Error") {
      return "Cannot divide by zero"
    }

    return `= ${formatDisplay(result)}`
  }, [
    display,
    firstValue,
    operator,
    waitingForOperand,
  ])

  useEffect(() => {
    const handleKeyboard = (event) => {
      const key = event.key

      if (/^[0-9]$/.test(key)) {
        event.preventDefault()
        handleDigit(key)
        return
      }

      if (key === ".") {
        event.preventDefault()
        handleDecimal()
        return
      }

      if (
        ["+", "-", "*", "/"].includes(key)
      ) {
        event.preventDefault()
        handleOperator(key)
        return
      }

      if (
        key === "Enter" ||
        key === "="
      ) {
        event.preventDefault()
        handleEquals()
        return
      }

      if (key === "Escape") {
        event.preventDefault()
        handleClear()
        return
      }

      if (key === "Backspace") {
        event.preventDefault()
        handleDelete()
        return
      }

      if (key === "%") {
        event.preventDefault()
        handlePercent()
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      )
    }
  }, [
    handleClear,
    handleDecimal,
    handleDelete,
    handleDigit,
    handleEquals,
    handleOperator,
    handlePercent,
  ])

  return (
    <div className="w-full max-w-[420px] rounded-[36px] border border-white/[0.10] bg-white/[0.055] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-3xl md:p-5">
      <Display
        expression={expression}
        value={display}
        preview={liveResult}
      />

      <div className="grid grid-cols-4 gap-3">
        <CalculatorButton
          variant="function"
          onClick={handleClear}
          ariaLabel="Clear calculator"
        >
          AC
        </CalculatorButton>

        <CalculatorButton
          variant="function"
          onClick={handleToggleSign}
          ariaLabel="Toggle positive negative"
        >
          ±
        </CalculatorButton>

        <CalculatorButton
          variant="function"
          onClick={handlePercent}
          ariaLabel="Percentage"
        >
          %
        </CalculatorButton>

        <CalculatorButton
          variant="operator"
          active={
            operator === "/" &&
            waitingForOperand
          }
          onClick={() =>
            handleOperator("/")
          }
          ariaLabel="Divide"
        >
          ÷
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("7")}
        >
          7
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("8")}
        >
          8
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("9")}
        >
          9
        </CalculatorButton>

        <CalculatorButton
          variant="operator"
          active={
            operator === "*" &&
            waitingForOperand
          }
          onClick={() =>
            handleOperator("*")
          }
          ariaLabel="Multiply"
        >
          ×
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("4")}
        >
          4
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("5")}
        >
          5
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("6")}
        >
          6
        </CalculatorButton>

        <CalculatorButton
          variant="operator"
          active={
            operator === "-" &&
            waitingForOperand
          }
          onClick={() =>
            handleOperator("-")
          }
          ariaLabel="Subtract"
        >
          −
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("1")}
        >
          1
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("2")}
        >
          2
        </CalculatorButton>

        <CalculatorButton
          onClick={() => handleDigit("3")}
        >
          3
        </CalculatorButton>

        <CalculatorButton
          variant="operator"
          active={
            operator === "+" &&
            waitingForOperand
          }
          onClick={() =>
            handleOperator("+")
          }
          ariaLabel="Add"
        >
          +
        </CalculatorButton>

        <CalculatorButton
          wide
          onClick={() => handleDigit("0")}
        >
          0
        </CalculatorButton>

        <CalculatorButton
          onClick={handleDecimal}
          ariaLabel="Decimal point"
        >
          .
        </CalculatorButton>

        <CalculatorButton
          variant="equals"
          onClick={handleEquals}
          ariaLabel="Equals"
        >
          =
        </CalculatorButton>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
        <span>Keyboard enabled</span>

        <span className="text-white/10">
          •
        </span>

        <span>Esc to clear</span>
      </div>
    </div>
  )
}

export default Calculator