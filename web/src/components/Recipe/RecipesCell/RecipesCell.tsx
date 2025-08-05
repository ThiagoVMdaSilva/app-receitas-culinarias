import type { FindRecipes, FindRecipesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  Alert,
} from '@mui/material'
import { Restaurant, Add } from '@mui/icons-material'

import Recipes from 'src/components/Recipe/Recipes'

export const QUERY: TypedDocumentNode<FindRecipes, FindRecipesVariables> = gql`
  query FindRecipes {
    recipes {
      id
      title
      ingredients
      instructions
      prepTime
      servings
      personalNote
      uniqueLink
      createdAt
    }
  }
`

export const Loading = () => (
  <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
    <CircularProgress size={60} sx={{ color: '#ff6b35', mb: 3 }} />
    <Typography variant="h6" color="text.secondary">
      Carregando receitas...
    </Typography>
  </Container>
)

export const Empty = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Restaurant sx={{ fontSize: 80, color: '#ff6b35', mb: 3, opacity: 0.7 }} />
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}
      >
        Nenhuma receita encontrada
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Que tal começar criando sua primeira receita deliciosa?
      </Typography>
      <Button
        component={Link}
        to={routes.newRecipe()}
        variant="contained"
        size="large"
        startIcon={<Add />}
        sx={{
          backgroundColor: '#ff6b35',
          '&:hover': {
            backgroundColor: '#e55a2b',
          },
          px: 4,
          py: 1.5,
          borderRadius: 2,
        }}
      >
        Criar Primeira Receita
      </Button>
    </Container>
  )
}

export const Failure = ({ error }: CellFailureProps<FindRecipes>) => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Alert severity="error" sx={{ borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Erro ao carregar receitas
      </Typography>
      <Typography variant="body2">
        {error?.message || 'Ocorreu um erro inesperado. Tente novamente.'}
      </Typography>
    </Alert>
  </Container>
)

export const Success = ({
  recipes,
}: CellSuccessProps<FindRecipes, FindRecipesVariables>) => {
  return <Recipes recipes={recipes} />
}

