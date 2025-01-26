import {getDictionary} from '#/get-dictionary';
import {Container} from '@mui/material';
import React from 'react';

export async function generateMetadata({
                                         params: {lang},
                                       }: {
  params: { lang: 'fa' | 'ar' | 'en' };
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary['metadata'].pmlm.title + ' | ' + dictionary['metadata'].pmlm.title,
    description: dictionary['metadata'].pmlm.description + ' | ' + dictionary['metadata'].pmlm.title,
  };
}

export default async function Layout({children,}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xs"
               sx={{minHeight: '100vh', backgroundColor: 'background.paper'}}
    >
      {children}
    </Container>
  );
}
