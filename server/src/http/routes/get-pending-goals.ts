import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getWeekPendingGoals } from '@/services/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending-goals',
    {
      schema: {
        querystring: z.object({
          weekOfYear: z.coerce.number(),
        }),
      },
    },
    async request => {
      const { weekOfYear } = request.query
      const { pendingGoals } = await getWeekPendingGoals(weekOfYear)

      return { pendingGoals }
    }
  )
}
