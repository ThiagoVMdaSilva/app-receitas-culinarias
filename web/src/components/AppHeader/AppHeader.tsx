import { Link, routes } from '@redwoodjs/router'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material'
import {
  Restaurant,
  Home,
  Add,
  MenuBook,
} from '@mui/icons-material'

interface AppHeaderProps {
  showHomeButton?: boolean
  showNewRecipeButton?: boolean
  showRecipesButton?: boolean
  currentPage?: 'home' | 'recipes' | 'new' | 'edit' | 'detail'
}

const AppHeader = ({
  showHomeButton = true,
  showNewRecipeButton = true,
  showRecipesButton = true,
  currentPage = 'home'
}: AppHeaderProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e9ecef'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo e título */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Restaurant sx={{ fontSize: 32, color: '#ff6b35' }} />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#ff6b35',
                textDecoration: 'none',
              }}
            >
              <Link
                to={routes.home()}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                App de Receitas
              </Link>
            </Typography>
          </Box>

          {/* Botões de navegação */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Botão Home */}
            {showHomeButton && (
              <Button
                component={Link}
                to={routes.home()}
                startIcon={<Home />}
                variant={currentPage === 'home' ? 'contained' : 'text'}
                sx={{
                  color: currentPage === 'home' ? 'white' : '#666',
                  backgroundColor: currentPage === 'home' ? '#ff6b35' : 'transparent',
                  '&:hover': {
                    backgroundColor: currentPage === 'home' ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)',
                    color: currentPage === 'home' ? 'white' : '#ff6b35',
                  },
                  borderRadius: 2,
                }}
              >
                Home
              </Button>
            )}

            {/* Botão Todas as Receitas */}
            {showRecipesButton && (
              <Button
                component={Link}
                to={routes.recipes()}
                startIcon={<MenuBook />}
                variant={currentPage === 'recipes' ? 'contained' : 'text'}
                sx={{
                  color: currentPage === 'recipes' ? 'white' : '#666',
                  backgroundColor: currentPage === 'recipes' ? '#ff6b35' : 'transparent',
                  '&:hover': {
                    backgroundColor: currentPage === 'recipes' ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)',
                    color: currentPage === 'recipes' ? 'white' : '#ff6b35',
                  },
                  borderRadius: 2,
                }}
              >
                Receitas
              </Button>
            )}

            {/* Botão Nova Receita */}
            {showNewRecipeButton && (
              <Button
                component={Link}
                to={routes.newRecipe()}
                variant="contained"
                startIcon={<Add />}
                sx={{
                  backgroundColor: '#ff6b35',
                  '&:hover': {
                    backgroundColor: '#e55a2b',
                  },
                  borderRadius: 2,
                  px: 3,
                  boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
                }}
              >
                Nova Receita
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
} 

export default AppHeader


