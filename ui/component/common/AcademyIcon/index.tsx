'use client';
import { styled } from '@mui/material';

type propsType = {
  src: string;
  color?: string;
  fontSize?: string;
};
export const AcademyIcon = styled(({ ...props }: propsType) => {
  const I = styled('i')({
    height: 'auto',
    display: 'inline-block',
    '&:before,&:after': {
      fontSize: props.fontSize ? props.fontSize : '28px',
      color: props.color,
    },
  });
  return <I {...props} className={props.src} />;
})({});
