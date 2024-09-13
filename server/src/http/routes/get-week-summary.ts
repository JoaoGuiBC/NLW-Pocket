import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getWeekSummary } from '@/services/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/summary',
    {
      schema: {
        querystring: z.object({
          weekOfYear: z.coerce.number(),
        }),
      },
    },
    async request => {
      const { weekOfYear } = request.query
      const { summary } = await getWeekSummary(weekOfYear)

      return { summary }
    }
  )
}
