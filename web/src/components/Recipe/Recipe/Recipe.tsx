import type {
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables,
  FindRecipeById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Paper,
  Grid,
} from '@mui/material'
import {
  AccessTime,
  People,
  ArrowBack,
  Edit,
  Delete,
  Restaurant,
} from '@mui/icons-material'
import { useState } from 'react'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  recipe: NonNullable<FindRecipeById['recipe']>
}

const Recipe = ({ recipe }: Props) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      toast.success('Receita excluída')
      navigate(routes.recipes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    deleteRecipe({ variables: { id: recipe.id } })
    setDeleteDialogOpen(false)
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Botão Voltar */}
        <Button
          component={Link}
          to={routes.recipes()}
          startIcon={<ArrowBack />}
          sx={{
            mb: 3,
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              color: '#ff6b35',
            },
          }}
        >
          Voltar para Receitas
        </Button>

        {/* Header da Receita */}
        <Paper
          sx={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            color: 'white',
            p: 4,
            borderRadius: 3,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Restaurant
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              fontSize: 60,
              opacity: 0.3,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {recipe.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<AccessTime />}
              label={recipe.prepTime}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '& .MuiChip-icon': { color: 'white' },
              }}
            />
            <Chip
              icon={<People />}
              label={`${recipe.servings} porções`}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '& .MuiChip-icon': { color: 'white' },
              }}
            />
          </Box>
        </Paper>

        {/* Conteúdo da Receita */}
        <Grid container spacing={4}>
          {/* Ingredientes */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                height: 'fit-content',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    color: '#ff6b35',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  🥘 Ingredientes
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#f8f9fa',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: '#333',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {recipe.ingredients}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Modo de Preparo */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                height: 'fit-content',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    color: '#ff6b35',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  👨‍🍳 Modo de Preparo
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#f8f9fa',
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: '#333',
                      '& ol': { paddingLeft: 2 },
                      '& ul': { paddingLeft: 2 },
                      '& li': { marginBottom: 1 },
                      '& p': { marginBottom: 1 },
                      '& strong': { fontWeight: 'bold' },
                      '& em': { fontStyle: 'italic' },
                    }}
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Nota Pessoal */}
        {recipe.personalNote && (
          <Card
            sx={{
              mt: 4,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#fff8e1',
              border: '1px solid #ffcc02',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#f57c00',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                💡 Nota Pessoal
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: '#333',
                  fontStyle: 'italic',
                }}
              >
                {recipe.personalNote}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Informações Adicionais */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Criado em {timeTag(recipe.createdAt)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {recipe.id}
          </Typography>
        </Box>

        {/* Botões de Ação */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            component={Link}
            to={routes.editRecipe({ id: recipe.id })}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Editar
          </Button>
          <Button
            onClick={handleDeleteClick}
            variant="contained"
            startIcon={<Delete />}
            sx={{
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#c62828',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Excluir
          </Button>
        </Box>

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
              Tem certeza de que deseja excluir a receita "{recipe.title}"? Esta ação não pode ser desfeita.
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

export default Recipe

