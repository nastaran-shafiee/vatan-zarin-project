'use client';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';

type fileUploadPropsType = {
  fileUploadHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  filePath: string;
};
const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload = ({ fileUploadHandler, filePath }: fileUploadPropsType) => {
  const t = useTranslations();

  return (
    <Box sx={{ pb: 3, textAlign: 'center' }}>
      <Button
        fullWidth
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        <Typography sx={{ p: 1 }}>{t('F_Request_Key221')}</Typography>
        <VisuallyHiddenInput onChange={fileUploadHandler} type="file" />
      </Button>
      {filePath && (
        <Typography
          variant={'caption'}
          sx={{
            py: 1,
            color: 'text.secondary',
            display: 'block',
          }}
        >
          {filePath}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
