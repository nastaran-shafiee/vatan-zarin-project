import { TextField, styled, TextFieldProps } from '@mui/material';

export const OutLinedTextField = styled(({ ...props }: TextFieldProps) => (
  <TextField fullWidth size="small" {...props}  />
))(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '50px', 
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    height: 'auto', 
  },
  '& .MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
}));
