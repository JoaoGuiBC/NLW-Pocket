import dayjs from 'dayjs'

import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Fazer três refeições completas', desiredWeeklyFrequency: 5 },
      { title: 'Estudar', desiredWeeklyFrequency: 3 },
      { title: 'Fazer caminhada', desiredWeeklyFrequency: 2 },
      { title: 'Dormir cedo', desiredWeeklyFrequency: 7 },
    ])
    .returning()

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: new Date() },
    { goalId: result[2].id, createdAt: dayjs().startOf('week').toDate() },
  ])
}

seed().finally(() => client.end())
