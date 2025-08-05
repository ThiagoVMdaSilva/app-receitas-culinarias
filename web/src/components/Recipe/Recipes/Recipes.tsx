import type {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
  FindRecipes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'
import {
  AccessTime,
  People,
  Visibility,
  Edit,
  Delete,
  Restaurant,
} from '@mui/icons-material'
import { useState } from 'react'

import { QUERY } from 'src/components/Recipe/RecipesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_RECIPE_MUTATION: TypedDocumentNode<
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables
> = gql`
  mutation DeleteRecipeMutation($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

const RecipesList = ({ recipes }: FindRecipes) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      toast.success('Receita excluída')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null)

  const handleDeleteClick = (id: DeleteRecipeMutationVariables['id']) => {
    setRecipeToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe({ variables: { id: recipeToDelete } })
    }
    setDeleteDialogOpen(false)
    setRecipeToDelete(null)
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setRecipeToDelete(null)
  }

  // Função para extrair texto limpo do HTML
  const extractTextFromHtml = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Restaurant sx={{ fontSize: 48, color: '#ff6b35', mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#ff6b35',
              mb: 2,
            }}
          >
            Todas as Receitas
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Explore nossa coleção completa de receitas deliciosas
          </Typography>
          <Button
            component={Link}
            to={routes.newRecipe()}
            variant="contained"
            size="large"
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
            + Nova Receita
          </Button>
        </Box>

        {/* Recipes Grid */}
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#333',
                      lineHeight: 1.3,
                    }}
                  >
                    {recipe.title}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, fontWeight: 'medium' }}
                    >
                      Ingredientes:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {truncate(recipe.ingredients, 100)}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, fontWeight: 'medium' }}
                    >
                      Modo de preparo:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {truncate(extractTextFromHtml(recipe.instructions), 100)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      mb: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Chip
                      icon={<AccessTime />}
                      label={recipe.prepTime}
                      size="small"
                      variant="outlined"
                      sx={{ color: '#666' }}
                    />
                    <Chip
                      icon={<People />}
                      label={`${recipe.servings} porções`}
                      size="small"
                      variant="outlined"
                      sx={{ color: '#666' }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 'auto' }}
                  >
                    Criado em {timeTag(recipe.createdAt)}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    p: 2,
                    pt: 0,
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    component={Link}
                    to={routes.recipe({ id: recipe.id })}
                    startIcon={<Visibility />}
                    size="small"
                    sx={{ color: '#ff6b35' }}
                  >
                    Ver Receita
                  </Button>
                  <Box>
                    <IconButton
                      component={Link}
                      to={routes.editRecipe({ id: recipe.id })}
                      size="small"
                      sx={{ color: '#1976d2', mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(recipe.id)}
                      size="small"
                      sx={{ color: '#d32f2f' }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={cancelDelete}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            Confirmar Exclusão
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Tem certeza de que deseja excluir esta receita? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}

export default RecipesList

