import { MetaTags } from '@redwoodjs/web'
import { Container, Typography, Box, Card, CardContent, Button, Grid } from '@mui/material'
import { Add as AddIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import RecipeCard from 'src/components/RecipeCard/RecipeCard'
import AppHeader from 'src/components/AppHeader/AppHeader'

const RECIPES_QUERY = gql`
  query RecipesQuery {
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
      likes {
        id
      }
    }
  }
`

const HomePage = () => {
  const { data, loading, error, refetch } = useQuery(RECIPES_QUERY)

  const handleLikeToggle = () => {
    // Refetch data to update like counts
    refetch()
  }

  return (
    <>
      <MetaTags title="App de Receitas" description="Compartilhe suas receitas favoritas" />
      
      {/* Header consistente */}
      <AppHeader 
        currentPage="home"
        showHomeButton={true} 
        showRecipesButton={true}
        showNewRecipeButton={true} 
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            🍳 App de Receitas
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Compartilhe suas receitas culinárias favoritas com a comunidade
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <AddIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Criar Nova Receita
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Compartilhe sua receita favorita com ingredientes, modo de preparo e dicas especiais.
                </Typography>
                <Button
                  component={Link}
                  to={routes.newRecipe()}
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                >
                  Nova Receita
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <FavoriteIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Explorar Receitas
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Descubra receitas incríveis compartilhadas pela comunidade e encontre sua próxima refeição favorita.
                </Typography>
                <Button
                  component={Link}
                  to={routes.recipes()}
                  variant="outlined"
                  size="large"
                  startIcon={<FavoriteIcon />}
                >
                  Ver Receitas
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Recipes Section */}
        {data?.recipes && data.recipes.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              Receitas Recentes
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {data.recipes.slice(0, 6).map((recipe) => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <RecipeCard 
                    recipe={recipe} 
                    onLikeToggle={handleLikeToggle}
                  />
                </Grid>
              ))}
            </Grid>
            
            {data.recipes.length > 6 && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  component={Link}
                  to={routes.recipes()}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.light'
                    }
                  }}
                >
                  Ver Todas as Receitas
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Empty State */}
        {data?.recipes && data.recipes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              Ainda não há receitas compartilhadas
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Seja o primeiro a compartilhar uma receita deliciosa!
            </Typography>
            <Button
              component={Link}
              to={routes.newRecipe()}
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
            >
              Criar Primeira Receita
            </Button>
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              Carregando receitas...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="error">
              Erro ao carregar receitas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {error.message}
            </Typography>
          </Box>
        )}

        <Box mt={6} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Sem necessidade de login ou cadastro. Comece a compartilhar agora mesmo!
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default HomePage

