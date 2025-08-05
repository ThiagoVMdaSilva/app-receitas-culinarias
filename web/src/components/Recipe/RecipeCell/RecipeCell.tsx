import type { FindRecipeById, FindRecipeByIdVariables } from 'types/graphql'

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
  Alert,
  Button,
} from '@mui/material'
import { Restaurant, ArrowBack } from '@mui/icons-material'
import { Link, routes } from '@redwoodjs/router'

import Recipe from 'src/components/Recipe/Recipe'

export const QUERY: TypedDocumentNode<FindRecipeById, FindRecipeByIdVariables> =
  gql`
    query FindRecipeById($id: Int!) {
      recipe: recipe(id: $id) {
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
  <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
    <CircularProgress size={60} sx={{ color: '#ff6b35', mb: 3 }} />
    <Typography variant="h6" color="text.secondary">
      Carregando receita...
    </Typography>
  </Container>
)

export const Empty = () => (
  <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
    <Restaurant sx={{ fontSize: 80, color: '#ff6b35', mb: 3, opacity: 0.7 }} />
    <Typography
      variant="h4"
      component="h2"
      sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}
    >
      Receita não encontrada
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
      A receita que você está procurando não existe ou foi removida.
    </Typography>
    <Button
      component={Link}
      to={routes.recipes()}
      variant="contained"
      startIcon={<ArrowBack />}
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
      Voltar para Receitas
    </Button>
  </Container>
)

export const Failure = ({
  error,
}: CellFailureProps<FindRecipeByIdVariables>) => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Box sx={{ mb: 3 }}>
      <Button
        component={Link}
        to={routes.recipes()}
        startIcon={<ArrowBack />}
        sx={{ mb: 2, color: '#666' }}
      >
        Voltar para Receitas
      </Button>
    </Box>
    <Alert severity="error" sx={{ borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Erro ao carregar receita
      </Typography>
      <Typography variant="body2">
        {error?.message || 'Ocorreu um erro inesperado. Tente novamente.'}
      </Typography>
    </Alert>
  </Container>
)

export const Success = ({
  recipe,
}: CellSuccessProps<FindRecipeById, FindRecipeByIdVariables>) => {
  return <Recipe recipe={recipe} />
}

