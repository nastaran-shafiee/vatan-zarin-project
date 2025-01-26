import { Grid } from "@mui/material";
import React from "react";
import { getDictionary } from "#/get-dictionary";
import MainLayout from "#/ui/main/layout";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "fa" | "ar" | "en" };
}) {
  const dictionary = await getDictionary(lang);
  return {
    title:
      dictionary["metadata"].pmlm.title +
      " | " +
      dictionary["metadata"].homePage.title,
    description:
      dictionary["metadata"].pmlm.description +
      " | " +
      dictionary["metadata"].homePage.description,
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container>
      <MainLayout>{children}</MainLayout>
    </Grid>
  );
}
