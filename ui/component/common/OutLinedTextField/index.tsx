import { TextField, styled, TextFieldProps } from '@mui/material';

export const OutLinedTextField = styled(({ ...props }: TextFieldProps) => (
  <TextField fullWidth size="small" {...props} />
))(({ theme }) => ({
  '& .MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
}));
