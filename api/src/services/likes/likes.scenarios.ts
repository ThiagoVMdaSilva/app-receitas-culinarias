import type { Prisma, Like } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LikeCreateArgs>({
  like: {
    one: {
      data: {
        recipe: {
          create: {
            title: 'String',
            ingredients: 'String',
            instructions: 'String',
            prepTime: 'String',
            servings: 'String',
            uniqueLink: 'String8115709',
          },
        },
      },
    },
    two: {
      data: {
        recipe: {
          create: {
            title: 'String',
            ingredients: 'String',
            instructions: 'String',
            prepTime: 'String',
            servings: 'String',
            uniqueLink: 'String3618783',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Like, 'like'>
