import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const currentTimezone = dayjs.tz.guess()

function getWeekDay(date: string) {
  const weekDay = dayjs.utc(date).tz(currentTimezone).format('dddd')

  return weekDay
}

function getFormattedDate(date: string) {
  const formattedDate = dayjs.utc(date).tz(currentTimezone).format('D[ de ]MMMM')

  return formattedDate
}

function getFormattedTime(date: string) {
  const time = dayjs.utc(date).tz(currentTimezone).format('HH:mm')

  return time
}

export { getWeekDay, getFormattedDate, getFormattedTime }
