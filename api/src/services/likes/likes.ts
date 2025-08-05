import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const likes: QueryResolvers['likes'] = () => {
  return db.like.findMany()
}

export const like: QueryResolvers['like'] = ({ id }) => {
  return db.like.findUnique({
    where: { id },
  })
}

export const createLike: MutationResolvers['createLike'] = ({ input }) => {
  return db.like.create({
    data: input,
  })
}

export const updateLike: MutationResolvers['updateLike'] = ({ id, input }) => {
  return db.like.update({
    data: input,
    where: { id },
  })
}

export const deleteLike: MutationResolvers['deleteLike'] = ({ id }) => {
  return db.like.delete({
    where: { id },
  })
}

export const toggleLike: MutationResolvers['toggleLike'] = async ({ recipeId }) => {
  // Verifica se já existe um like para esta receita
  const existingLike = await db.like.findFirst({
    where: { recipeId },
  })

  if (existingLike) {
    // Se existe, remove o like
    await db.like.delete({
      where: { id: existingLike.id },
    })
    return null
  } else {
    // Se não existe, cria um novo like
    return db.like.create({
      data: { recipeId },
    })
  }
}

export const Like = {
  recipe: (_obj, { root }) => {
    return db.like.findUnique({ where: { id: root?.id } }).recipe()
  },
}

