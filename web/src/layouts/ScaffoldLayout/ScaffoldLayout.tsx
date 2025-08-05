import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import {
  Box,
} from '@mui/material'
import AppHeader from 'src/components/AppHeader/AppHeader'

type LayoutProps = {
  title: string
  titleTo: keyof typeof routes
  buttonLabel: string
  buttonTo: keyof typeof routes
  children: React.ReactNode
  currentPage?: 'home' | 'recipes' | 'new' | 'edit' | 'detail'
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
  currentPage = 'recipes'
}: LayoutProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      
      {/* Header unificado */}
      <AppHeader 
        currentPage={currentPage}
        showHomeButton={true}
        showRecipesButton={true}
        showNewRecipeButton={true}
      />

      {/* Conteúdo principal */}
      <Box component="main" sx={{ minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </Box>
    </Box>
  )
}

export default ScaffoldLayout

