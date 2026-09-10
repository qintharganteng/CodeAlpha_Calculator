export const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
}

export function calculate(firstValue, secondValue, operator) {
  const first = Number(firstValue)
  const second = Number(secondValue)

  let result

  switch (operator) {
    case "+":
      result = first + second
      break

    case "-":
      result = first - second
      break

    case "*":
      result = first * second
      break

    case "/":
      if (second === 0) {
        return "Error"
      }

      result = first / second
      break

    default:
      return String(second)
  }

  // Menghindari hasil seperti 0.1 + 0.2 = 0.30000000004
  return Number.parseFloat(result.toFixed(10)).toString()
}

export function formatDisplay(value) {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return "0"
  }

  if (value === "Error") {
    return "Error"
  }

  const stringValue = String(value)

  // Jangan format scientific notation
  if (
    stringValue.includes("e") ||
    stringValue.includes("E")
  ) {
    return stringValue
  }

  const [integerPart, decimalPart] =
    stringValue.split(".")

  const formattedInteger = Number(
    integerPart
  ).toLocaleString("en-US")

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`
  }

  return formattedInteger
}