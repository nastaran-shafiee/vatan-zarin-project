"use client";
import React, { ReactNode } from "react";
import { useAppSelector } from "#/redux/hooks";

export const AuthorizationNeeded = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.sessionSlice.tokenPmlm);

  if (token) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export const useIsAutenticated = () => {
  const token = useAppSelector((state) => state.sessionSlice.tokenPmlm);

  if (token) {
    return true;
  } else {
    return false;
  }
};
