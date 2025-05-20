export enum AdjustDateUnit {
  YEARS = 'y',
  MONTHS = 'm',
  DAYS = 'd',
  HOURS = 'h',
}

export function AdjustDate(value: number, unit: AdjustDateUnit, referenceDate?: Date): Date {
  const adjustedDate = referenceDate ? new Date(referenceDate) : new Date()

  switch (unit) {
    case AdjustDateUnit.YEARS:
      adjustedDate.setFullYear(adjustedDate.getFullYear() + value)
      break
    case AdjustDateUnit.MONTHS:
      adjustedDate.setMonth(adjustedDate.getMonth() + value)
      break
    case AdjustDateUnit.DAYS:
      adjustedDate.setDate(adjustedDate.getDate() + value)
      break
    case AdjustDateUnit.HOURS:
      adjustedDate.setHours(adjustedDate.getHours() + value)
      break
    default:
      return referenceDate
  }

  return adjustedDate
}

export function AdjustDateEasy(input: string, referenceDate?: Date): Date {
  const regex = /^([+-]?)(\d+)([hdmy])$/
  const match = input.match(regex)

  const sign = match?.[1]
  const value = match?.[2]
  const unit = match?.[3]

  let newValue = parseInt(value)
  if (sign === '-') newValue = -newValue

  switch (unit) {
    case 'h':
      return AdjustDate(newValue, AdjustDateUnit.HOURS, referenceDate)
    case 'd':
      return AdjustDate(newValue, AdjustDateUnit.DAYS, referenceDate)
    case 'm':
      return AdjustDate(newValue, AdjustDateUnit.MONTHS, referenceDate)
    case 'y':
      return AdjustDate(newValue, AdjustDateUnit.YEARS, referenceDate)
    default:
      return referenceDate
  }
}
