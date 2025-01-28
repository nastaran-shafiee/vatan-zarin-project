import { TextField, styled, TextFieldProps } from '@mui/material';
export const OutLinedTextField = styled(({ ...props }: TextFieldProps) => (
  <TextField fullWidth size="small" {...props} />
))(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '50px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[200], 
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[200]  
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[200], 
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px', 
    height: 'auto',
    '&::placeholder': {
      color:theme.palette.grey[200],  
      opacity: 1,  
    },
    '&:focus::placeholder': {
      color:theme.palette.grey[200], 
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],   
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.action.active,    
    '&.Mui-focused': {
      color: theme.palette.action.active,      
    },
    '&.Mui-disabled': {
      color: theme.palette.text.disabled,      
    },
    
  },
 
  '& .MuiFormLabel-asterisk': {
    color: theme.palette.error.main,     
  },
}));
