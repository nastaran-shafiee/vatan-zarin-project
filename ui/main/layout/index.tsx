"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  AuthorizationNeeded,
  useIsAutenticated,
} from "#/ui/component/common/AuthorizationNeeded";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAutenticated = useIsAutenticated();
  const { lang } = useParams();

  useEffect(() => {
    !isAutenticated && router.push(`/${lang}/auth/login`);
  }, []);

  return <AuthorizationNeeded>{children}</AuthorizationNeeded>;
}
