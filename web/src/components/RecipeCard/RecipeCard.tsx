import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material'
import { Favorite, FavoriteBorder, AccessTime, People } from '@mui/icons-material'
import { Link } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLikeMutation($recipeId: Int!) {
    toggleLike(recipeId: $recipeId) {
      id
      recipeId
      createdAt
    }
  }
`

interface RecipeCardProps {
  recipe: {
    id: number
    title: string
    ingredients: string
    instructions: string
    prepTime: string
    servings: string
    personalNote?: string
    uniqueLink: string
    createdAt: string
    likes: Array<{ id: number }>
  }
  onLikeToggle?: () => void
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onLikeToggle }) => {
  const [toggleLike, { loading: likeLoading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    onCompleted: () => {
      if (onLikeToggle) {
        onLikeToggle()
      }
    },
    onError: (error) => {
      toast.error('Erro ao curtir receita: ' + error.message)
    }
  })

  const handleLike = () => {
    toggleLike({ variables: { recipeId: recipe.id } })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getIngredientsList = (ingredients: string) => {
    return ingredients.split(',').slice(0, 3).map(ing => ing.trim())
  }

  // Função para extrair texto limpo do HTML
  const extractTextFromHtml = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        margin: 2, 
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {recipe.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {recipe.prepTime}
          </Typography>
          <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {recipe.servings} porções
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Ingredientes:</strong>
        </Typography>
        <Box sx={{ mb: 2 }}>
          {getIngredientsList(recipe.ingredients).map((ingredient, index) => (
            <Chip 
              key={index} 
              label={ingredient} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5 }}
              variant="outlined"
            />
          ))}
          {recipe.ingredients.split(',').length > 3 && (
            <Chip 
              label={`+${recipe.ingredients.split(',').length - 3} mais`} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5 }}
              color="primary"
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Modo de preparo:</strong> {extractTextFromHtml(recipe.instructions).substring(0, 100)}
          {extractTextFromHtml(recipe.instructions).length > 100 && '...'}
        </Typography>

        {recipe.personalNote && (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'primary.main', mb: 1 }}>
            💡 {recipe.personalNote}
          </Typography>
        )}

        <Typography variant="caption" color="text.secondary">
          Criado em {formatDate(recipe.createdAt)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            size="small"
            onClick={handleLike}
            disabled={likeLoading}
            startIcon={recipe.likes.length > 0 ? <Favorite color="error" /> : <FavoriteBorder />}
            sx={{ 
              color: recipe.likes.length > 0 ? 'error.main' : 'text.secondary',
              '&:hover': {
                backgroundColor: recipe.likes.length > 0 ? 'error.light' : 'grey.100'
              }
            }}
          >
            {recipe.likes.length}
          </Button>
        </Box>
        
        <Box>
          <Button 
            size="small" 
            component={Link} 
            to={`/recipes/${recipe.id}`}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Ver Receita
          </Button>
          <Button 
            size="small" 
            component={Link} 
            to={`/recipes/${recipe.id}/edit`}
            variant="contained"
          >
            Editar
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default RecipeCard

