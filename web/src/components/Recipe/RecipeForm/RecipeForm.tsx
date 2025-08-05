import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Button,
  Alert
} from '@mui/material'
import { Save as SaveIcon } from '@mui/icons-material'
import TipTapEditor from 'src/components/TipTapEditor/TipTapEditor'
import { useState } from 'react'

type FormRecipe = NonNullable<EditRecipeById['recipe']>

interface RecipeFormProps {
  recipe?: EditRecipeById['recipe']
  onSave: (data: UpdateRecipeInput, id?: FormRecipe['id']) => void
  error: RWGqlError
  loading: boolean
}

const RecipeForm = (props: RecipeFormProps) => {
  const [instructions, setInstructions] = useState(props.recipe?.instructions || '')
  const [personalNote, setPersonalNote] = useState(props.recipe?.personalNote || '')

  const onSubmit = (data: FormRecipe) => {
    const formData = {
      ...data,
      instructions,
      personalNote
    }
    props.onSave(formData, props?.recipe?.id)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          {props.recipe ? 'Editar Receita' : 'Nova Receita'}
        </Typography>

        <Form<FormRecipe> onSubmit={onSubmit} error={props.error}>
          {props.error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <FormError
                error={props.error}
                wrapperStyle={{ margin: 0 }}
                titleStyle={{ margin: 0, fontSize: '1rem' }}
                listStyle={{ margin: 0, paddingLeft: '1rem' }}
              />
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Título */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Label
                  name="title"
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Título da Receita *
                </Label>
                <TextField
                  name="title"
                  defaultValue={props.recipe?.title}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  validation={{ required: 'O título é obrigatório' }}
                  placeholder="Ex: Bolo de Chocolate Caseiro"
                />
                <FieldError name="title" style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }} />
              </Box>
            </Grid>

            {/* Ingredientes */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Label
                  name="ingredients"
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Ingredientes *
                </Label>
                <TextField
                  name="ingredients"
                  defaultValue={props.recipe?.ingredients}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    minHeight: '100px'
                  }}
                  validation={{ required: 'Os ingredientes são obrigatórios' }}
                  placeholder="Ex: 2 xícaras de farinha, 1 xícara de açúcar, 3 ovos..."
                />
                <FieldError name="ingredients" style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }} />
              </Box>
            </Grid>

            {/* Modo de Preparo com TipTap */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Modo de Preparo *
                </Typography>
                <TipTapEditor
                  content={instructions}
                  onChange={setInstructions}
                  placeholder="Descreva o passo a passo para preparar sua receita..."
                />
              </Box>
            </Grid>

            {/* Tempo de Preparo e Porções */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Label
                  name="prepTime"
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Tempo de Preparo *
                </Label>
                <TextField
                  name="prepTime"
                  defaultValue={props.recipe?.prepTime}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  validation={{ required: 'O tempo de preparo é obrigatório' }}
                  placeholder="Ex: 45 minutos"
                />
                <FieldError name="prepTime" style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Label
                  name="servings"
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Porções *
                </Label>
                <TextField
                  name="servings"
                  defaultValue={props.recipe?.servings}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  validation={{ required: 'O número de porções é obrigatório' }}
                  placeholder="Ex: 8 fatias"
                />
                <FieldError name="servings" style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }} />
              </Box>
            </Grid>

            {/* Nota Pessoal com TipTap */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Nota Pessoal (Opcional)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Compartilhe dicas especiais, variações ou memórias relacionadas a esta receita
                </Typography>
                <TipTapEditor
                  content={personalNote}
                  onChange={setPersonalNote}
                  placeholder="Ex: Esta receita foi passada pela minha avó. Para deixar mais úmido, adicione uma colher de café..."
                />
              </Box>
            </Grid>

            {/* Link Único */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Label
                  name="uniqueLink"
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Link Único (Opcional)
                </Label>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Um identificador único para sua receita (será gerado automaticamente se não fornecido)
                </Typography>
                <TextField
                  name="uniqueLink"
                  defaultValue={props.recipe?.uniqueLink}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  placeholder="Ex: bolo-chocolate-vovo-maria"
                />
                <FieldError name="uniqueLink" style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }} />
              </Box>
            </Grid>

            {/* Botão de Salvar */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => window.history.back()}
                >
                  Cancelar
                </Button>
                <Submit
                  disabled={props.loading}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={props.loading}
                    sx={{
                      minWidth: '150px',
                      py: 1.5
                    }}
                  >
                    {props.loading ? 'Salvando...' : 'Salvar Receita'}
                  </Button>
                </Submit>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Container>
  )
}

export default RecipeForm

