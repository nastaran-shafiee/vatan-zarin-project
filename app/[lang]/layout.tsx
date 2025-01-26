// import { Providers } from '#/redux/provider';
import { NextIntlClientProvider } from "next-intl";
import RegisterServiceWorker from "#/registerServiceWorker";
import ThemeRegistry from "#/theme";
import ErrorBoundary from "#/ui/component/common/ErrorBoundry";
import "swiper/css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("../../redux/provider"), { ssr: false });

const APP_NAME = "PMLM";
const APP_DEFAULT_TITLE = "PMLM";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Panberez multi level marketing.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    description: APP_DESCRIPTION,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messages = require(`../../dictionaries/${params.lang}.json`);

  return (
    <Providers>
      <RegisterServiceWorker>
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <ThemeRegistry>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeRegistry>
        </NextIntlClientProvider>
      </RegisterServiceWorker>
    </Providers>
  );
}
