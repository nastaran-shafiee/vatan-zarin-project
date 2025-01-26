import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Route } from 'next';
import React, { ComponentPropsWithoutRef, FC } from 'react';

type PersistLangLinkProps = {
  href: Route | URL;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export const PersistLangLink: FC<PersistLangLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const param = useParams();
  return (
    <Link
      href={`/${param.lang}/${href}`}
      {...props}
    >
      {children}
    </Link>
  );
};
