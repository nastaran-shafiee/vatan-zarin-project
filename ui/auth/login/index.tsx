"use client";
import { Typography, Grid, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@mui/lab";
import { removeRedirectedPath, setToken } from "#/redux/features/sessionSlice";
import { FormProvider, useForm } from "react-hook-form";
import { getIpAddress } from "#/helper";
import { useEffect, useMemo, useState } from "react";
import { useLoginUserMutation } from "#/redux/services/UserApi";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "#/redux/hooks";

import FormTextFiled from "#/ui/component/common/FormTextFiled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  setAlert,
  setError,
  setMessage,
  setSuccess,
} from "#/redux/features/snackBarHandlerSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { lang } = useParams();
  const t = useTranslations();
  const [loginUser, { isLoading }] = useLoginUserMutation({});

  const schema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t("F_PorKardanElzami")),
        password: yup.string().required(t("F_PorKardanElzami")),
      }),
    [t]
  );
  const methods = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  interface params {
    username: string;
    password: string;
  }

  const onSubmit = (data: any) => {
    const params: params = {
      username: data.username,
      password: data.password,
    };
    loginUser(params)
      .unwrap()
      .then((response) => {
        if (response.isSuccess) {
          dispatch(setToken(response?.result?.token || ""));
          router.push(`/${lang}`);
        } else {
          dispatch(setAlert(true));
          dispatch(setError(true));
          dispatch(setMessage(response.errors[0]?.message));
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sx={{ pb: 2 }}>
              <FormTextFiled
                name={"username"}
                required={true}
                label={t("Username")}
              />
            </Grid>
            <Grid item xs={12} sx={{ pb: 4 }}>
              <FormTextFiled
                required={true}
                name={"password"}
                type={"password"}
                label={t("Password")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              sx={{ pb: 2 }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                loading={isLoading}
                sx={{ py: 1.3 }}
              >
                <Typography variant="body1"> {t("S_Vorod")}</Typography>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}
