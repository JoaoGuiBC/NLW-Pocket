import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { client, db } from '.'
import { goalCompletions, goals } from './schema'

dayjs.extend(utc)
dayjs.extend(timezone)

const currentTimezone = dayjs.tz.guess()

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Fazer três refeições', desiredWeeklyFrequency: 5 },
      { title: 'Estudar', desiredWeeklyFrequency: 3 },
      { title: 'Fazer caminhada', desiredWeeklyFrequency: 2 },
      { title: 'Dormir cedo', desiredWeeklyFrequency: 7 },
    ])
    .returning()

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: new Date() },
    {
      goalId: result[2].id,
      createdAt: dayjs.utc().tz(currentTimezone).startOf('week').toDate(),
    },
  ])
}

seed().finally(() => client.end())
