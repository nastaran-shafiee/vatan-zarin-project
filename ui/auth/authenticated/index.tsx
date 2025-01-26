'use client';
import React from 'react';

export default function Authenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
