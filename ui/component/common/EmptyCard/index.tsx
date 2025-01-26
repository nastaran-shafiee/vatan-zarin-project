import { Box, Typography } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const EmptyCard = ({ message }: { message: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '250px',
        color: 'text.secondary',
      }}
    >
      <PriorityHighIcon />
      <Typography variant={'body1'} >
        {message}
      </Typography>
    </Box>
  );
};
export default EmptyCard;
