import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface TodoProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function Todo({ id, title, description, completed, onEdit, onDelete, onToggle }: TodoProps) {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        opacity: completed ? 0.7 : 1,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flex={1} onClick={() => onToggle(id)} sx={{ cursor: 'pointer' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.secondary' : 'text.primary'
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textDecoration: completed ? 'line-through' : 'none'
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => onEdit(id)} size="small">
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(id)} size="small" color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
} 