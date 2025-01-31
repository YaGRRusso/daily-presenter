export enum AdjustDateUnit {
  YEARS = 'years',
  MONTHS = 'months',
  DAYS = 'days',
  HOURS = 'hours',
  MINUTES = 'minutes',
}

export function AdjustDate(referenceDate: Date, unit: AdjustDateUnit, value: number): Date {
  const adjustedDate = new Date(referenceDate)

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
    case AdjustDateUnit.MINUTES:
      adjustedDate.setMinutes(adjustedDate.getMinutes() + value)
      break
    default:
      return referenceDate
  }

  return adjustedDate
}
