import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Paper, Toolbar, IconButton, Divider } from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo
} from '@mui/icons-material'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, onChange, placeholder = 'Digite aqui...' }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        style: 'min-height: 200px; padding: 16px; outline: none;'
      }
    }
  })

  if (!editor) {
    return null
  }

  return (
    <Paper variant="outlined" sx={{ border: '1px solid #ccc' }}>
      <Toolbar sx={{ minHeight: '48px !important', px: 1 }}>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <FormatBold />
        </IconButton>
        
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <FormatItalic />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <FormatListBulleted />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <FormatListNumbered />
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo />
        </IconButton>
      </Toolbar>

      <Divider />

      <Box sx={{ minHeight: 200 }}>
        <EditorContent 
          editor={editor} 
          style={{
            '& .ProseMirror': {
              minHeight: '200px',
              padding: '16px',
              outline: 'none'
            },
            '& .ProseMirror p.is-editor-empty:first-child::before': {
              content: `"${placeholder}"`,
              float: 'left',
              color: '#adb5bd',
              pointerEvents: 'none',
              height: 0
            }
          }}
        />
      </Box>
    </Paper>
  )
}

export default TipTapEditor

