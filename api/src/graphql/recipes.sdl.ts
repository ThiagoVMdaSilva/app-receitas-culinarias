export const schema = gql`
  type Recipe {
    id: Int!
    title: String!
    ingredients: String!
    instructions: String!
    prepTime: String!
    servings: String!
    personalNote: String
    uniqueLink: String!
    likes: [Like]!
    createdAt: DateTime!
  }

  type Query {
    recipes: [Recipe!]! @requireAuth
    recipe(id: Int!): Recipe @requireAuth
  }

  input CreateRecipeInput {
    title: String!
    ingredients: String!
    instructions: String!
    prepTime: String!
    servings: String!
    personalNote: String
    uniqueLink: String!
  }

  input UpdateRecipeInput {
    title: String
    ingredients: String
    instructions: String
    prepTime: String
    servings: String
    personalNote: String
    uniqueLink: String
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe! @requireAuth
    updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe! @requireAuth
    deleteRecipe(id: Int!): Recipe! @requireAuth
  }
`
