import 'dayjs/locale/fa';
import {TextField, styled, TextFieldProps} from '@mui/material';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

export const OutLinedTextField = styled(({...props}: TextFieldProps) => (
  <TextField fullWidth size="small" {...props} />
))(({theme}) => ({}));

const DatePicker = dynamic(
  () => import('@mui/x-date-pickers/DatePicker').then((mod) => mod.DatePicker),
  {
    loading: () => <CircularProgress/>,
  },
);

