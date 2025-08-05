export const schema = gql`
  type Like {
    id: Int!
    recipe: Recipe!
    recipeId: Int!
    createdAt: DateTime!
  }

  type Query {
    likes: [Like!]! @requireAuth
    like(id: Int!): Like @requireAuth
  }

  input CreateLikeInput {
    recipeId: Int!
  }

  input UpdateLikeInput {
    recipeId: Int
  }

  type Mutation {
    createLike(input: CreateLikeInput!): Like! @requireAuth
    updateLike(id: Int!, input: UpdateLikeInput!): Like! @requireAuth
    deleteLike(id: Int!): Like! @requireAuth
    toggleLike(recipeId: Int!): Like @skipAuth
  }
`

