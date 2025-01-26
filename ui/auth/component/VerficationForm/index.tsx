"use client";
import { FormProvider, useForm } from "react-hook-form";
import FormTextFiled from "#/ui/component/common/FormTextFiled";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";

const VerificationForm = ({ submitHandler }: any) => {
  const t = useTranslations();
  const schema = useMemo(
    () =>
      yup.object().shape({
        verificationCode: yup.string().required(t("F_PorKardanElzami")),
      }),
    [t]
  );
  const methods = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });
  const { handleSubmit } = methods;
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FormTextFiled
            required={true}
            name={"verificationCode"}
            label={`${t("S_YourVerifyCodeAccount")}`}
            inputProps={{
              style: {
                textAlign: "center",
                letterSpacing: "20px",
                fontSize: "20px",
              },
            }}
          />
          <Typography
            textAlign={"center"}
            display={"block"}
            variant={"caption"}
            sx={{ my: 3, color: "text.secondary" }}
          >
            {t(`Z_Shom_Yek_Kod_Payamaki_Daryaft_Khahid_kard`)}
          </Typography>
          <LoadingButton
            variant={"contained"}
            type={"submit"}
            fullWidth
            sx={{ py: 1 }}
          >
            {t(`H_Ersal_Cod`)}
          </LoadingButton>
        </form>
      </FormProvider>
    </>
  );
};
export default VerificationForm;
