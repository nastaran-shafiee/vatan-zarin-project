'use client';

import { useEffect, ReactNode, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAppDispatch } from '#/redux/hooks';
import { setTheme } from '#/redux/features/settingSlice';

export default function RegisterServiceWorker({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // dispatch(setTheme(window.localStorage.getItem('pmlm-dark-theme') || ''));

  // useLayoutEffect(() => {
  //   dispatch(setTheme(localStorage.getItem('pmlm-dark-theme')));
  // }, []);

  useEffect(() => {
    const curentVersion = window.localStorage.getItem('curent-version');
    import('package.json').then((app) => {
      if (curentVersion) {
        if (curentVersion !== app.version) {
          window.localStorage.setItem('curent-version', app.version);
          window.location.href = window.location.href;
        }
      } else {
        window.localStorage.setItem('curent-version', app.version);
      }
    });
  }, [pathname]);

  // useEffect(() => {
  //   navigator?.serviceWorker
  //     ?.register('/fa/serviceWorker.js')
  //     .then((registration) =>
  //       console.log(
  //         'Service Worker registration successful with scope: ',
  //         registration.scope,
  //       ),
  //     )
  //     .catch((err) => console.log('Service Worker registration failed: ', err));
  // }, []);

  return <>{children}</>;
}
