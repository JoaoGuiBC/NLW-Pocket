import dayjs from 'dayjs'

import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Fazer três refeições', desiredWeeklyFrequency: 5 },
      {
        title: 'Estudar',
        desiredWeeklyFrequency: 3,
        createdAt: dayjs().subtract(1, 'week').toDate(),
      },
      {
        title: 'Fazer caminhada',
        desiredWeeklyFrequency: 2,
        createdAt: dayjs().subtract(1, 'week').toDate(),
      },
      {
        title: 'Dormir cedo',
        desiredWeeklyFrequency: 5,
        createdAt: dayjs().subtract(1, 'week').toDate(),
      },
    ])
    .returning()

  await db.insert(goalCompletions).values([
    { goalId: result[1].id, createdAt: dayjs().subtract(1, 'week').toDate() },
    {
      goalId: result[1].id,
      createdAt: dayjs().startOf('week').subtract(1, 'week').toDate(),
    },
    { goalId: result[3].id, createdAt: dayjs().subtract(1, 'week').toDate() },
    {
      goalId: result[2].id,
      createdAt: dayjs().startOf('week').subtract(1, 'week').toDate(),
    },
    { goalId: result[0].id, createdAt: new Date() },
    {
      goalId: result[2].id,
      createdAt: dayjs().startOf('week').toDate(),
    },
  ])
}

seed().finally(() => client.end())
