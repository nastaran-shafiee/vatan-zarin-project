import 'swiper/css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React from 'react';
import type { Viewport } from 'next';
import Script from 'next/script';

import Head from 'next/head';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} style={{ scrollBehavior: 'smooth' }}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="robots" content="max-image-preview:large" />
        <meta
          name="msapplication-TileImage"
          content="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-270x270.png"
        />
        <meta name="theme-color" content="#711F7E" />
        <meta name="msapplication-navbutton-color" content="#711F7E" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#711F7E" />
        <meta
          name="google-site-verification"
          content="9ocjO7VzE-x8E0DQtqw0Iu1kIX4WtuLu1pJZwhdcXUc"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://cdn.pmlm.ir/assets/pmlmWeb/images/logo/pmlm-192x192.png"
        />
        <link rel="manifest" href="manifest.json" />
      </Head>

      <Script id="google-tag-manager" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-52TK3GMQ');`}
      </Script>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-52TK3GMQ"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        {children}
      </body>
    </html>
  );
}
