export enum DateUnit {
  YEARS = 'y',
  MONTHS = 'm',
  DAYS = 'd',
  HOURS = 'h',
}

export function AdjustDate(value: number, unit: DateUnit, referenceDate?: Date): Date {
  const adjustedDate = referenceDate ? new Date(referenceDate) : new Date()

  switch (unit) {
    case DateUnit.YEARS:
      adjustedDate.setFullYear(adjustedDate.getFullYear() + value)
      break
    case DateUnit.MONTHS:
      adjustedDate.setMonth(adjustedDate.getMonth() + value)
      break
    case DateUnit.DAYS:
      adjustedDate.setDate(adjustedDate.getDate() + value)
      break
    case DateUnit.HOURS:
      adjustedDate.setHours(adjustedDate.getHours() + value)
      break
    default:
      return referenceDate
  }

  return adjustedDate
}

export function AdjustDateEasy(input: string, referenceDate?: Date): Date {
  const adjustedDate = referenceDate ? new Date(referenceDate) : new Date()
  const regex = /^([+-]?)(\d+)([hdmy])$/
  const match = input.match(regex)

  const sign = match?.[1]
  const value = match?.[2]
  const unit = match?.[3]

  let newValue = parseInt(value)
  if (sign === '-') newValue = -newValue

  switch (unit) {
    case 'h':
      return AdjustDate(newValue, DateUnit.HOURS, adjustedDate)
    case 'd':
      return AdjustDate(newValue, DateUnit.DAYS, adjustedDate)
    case 'm':
      return AdjustDate(newValue, DateUnit.MONTHS, adjustedDate)
    case 'y':
      return AdjustDate(newValue, DateUnit.YEARS, adjustedDate)
    default:
      return referenceDate
  }
}

export const DayNames = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
]

export function CurrentWeekDays(referenceDate?: Date) {
  const adjustedDate = referenceDate ? new Date(referenceDate) : new Date()
  const weekday = adjustedDate.getDay()

  const startDate = new Date(adjustedDate)
  startDate.setDate(adjustedDate.getDate() - weekday)
  startDate.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }).map((_, index) => {
    const date = AdjustDate(index, DateUnit.DAYS, startDate)
    return { day: DayNames[date.getDay()], date }
  })
}

export function CurrentMonthDays(referenceDate?: Date) {
  const adjustedDate = referenceDate ? new Date(referenceDate) : new Date()
  const startDate = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 1)
  const endDate = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0)
  const daysInMonth = endDate.getDate()

  return Array.from({ length: daysInMonth }).map((_, index) => {
    const date = new Date(startDate)
    date.setHours(0, 0, 0, 0)
    date.setDate(index + 1)
    return { day: DayNames[date.getDay()], date }
  })
}

export function CurrentMonthWeek(referenceDate?: Date): number {
  const adjustedDate = referenceDate ? new Date(referenceDate) : new Date()
  const firstDayOfMonth = CurrentMonthDays(adjustedDate)[0].date
  const firstDayOfWeek = firstDayOfMonth.getDay()

  const dayOfMonth = adjustedDate.getDate()
  return Math.ceil((dayOfMonth + firstDayOfWeek) / 7)
}
