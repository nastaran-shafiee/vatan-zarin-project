'use client';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import src from '#/public/images/notFound1.jpg';
import { Button, Typography } from '@mui/material';
import React from 'react';
import Link from 'next/link';

const ErrorContent = () => {
  return (
    <>
      <Grid container justifyContent={'center'} flexDirection={'row-reverse'}>
        <Grid item xs={12}>
          <Image
            src={src}
            alt={'not found'}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              width: '100%',
              height: 'auto',
              overflow: 'hidden',
              borderRadius: '10px',
            }}
            width={889}
            height={599}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Link href={'/fa/product/search'}>
          <Button
            variant={'contained'}
            color={'primary'}
            sx={{
              borderRadius: '15px',
              color: '#fff',
              backgroundColor: '#711F7E',
              '&:hover': { backgroundColor: '#711F7E' },
            }}
          >
            <Typography variant={'h6'}>بازگشت به صفحه اصلی</Typography>
          </Button>
        </Link>
      </Grid>
    </>
  );
};
export default ErrorContent;
