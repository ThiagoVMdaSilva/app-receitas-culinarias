import type { Prisma, Recipe } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RecipeCreateArgs>({
  recipe: {
    one: {
      data: {
        title: 'String',
        ingredients: 'String',
        instructions: 'String',
        prepTime: 'String',
        servings: 'String',
        uniqueLink: 'String8673273',
      },
    },
    two: {
      data: {
        title: 'String',
        ingredients: 'String',
        instructions: 'String',
        prepTime: 'String',
        servings: 'String',
        uniqueLink: 'String7470020',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Recipe, 'recipe'>
