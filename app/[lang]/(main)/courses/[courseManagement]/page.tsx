"use client";
import Header from "#/ui/component/common/Header";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextFiledFileUpload from "#/ui/component/common/TextFiledFileUpload";
import FormInputText from "#/ui/component/common/FormTextFiled";
import { FormProvider, useForm } from "react-hook-form";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OutLinedTextField } from "#/ui/component/common/OutLinedTextField";
import FormSelect from "#/ui/component/common/FormSelect";

const CourseManagement = () => {
  const params = useParams();
  const courseManagement = params?.courseManagement;
  const router = useRouter();
  const t = useTranslations();

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

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <Header
        text={t("List_courses")}
        isTheme={false}
        customNode={
          <ArrowForwardIosIcon
            width="28px"
            height="28px"
            onClick={() => router.back()}
          />
        } // Custom back icon
      />

      <Box
        sx={{
          marginTop: "16px",
          marginBottom: "20px",
          bgcolor: "background.paper",
          paddingX: "8px",
          paddingY: "24px",
        }}
      >
        <TextFiledFileUpload
          title="کاور"
          isRequired={true}
          label="افزودن کاور"
        />
      </Box>
      <FormProvider {...methods}>
        <Box
          sx={{
            marginTop: "16px",
            marginBottom: "20px",
            bgcolor: "background.paper",
            paddingX: "8px",
            paddingY: "24px",
          }}
        >
          <Typography variant="h6">اطلاعات دوره</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginY: "24px",
            }}
          >
            <OutLinedTextField label={"نام دوره"} name={"name"} required />
            <OutLinedTextField label={" توضیحات"} name={"name"} required />
            <FormSelect name="" label="زبان " required />
            <FormSelect name="" label="حداقل رنک " required />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "16px",
            bgcolor: "background.paper",
            paddingX: "8px",
            paddingY: "24px",
          }}
        >
          <Button variant="contained" color="primary" fullWidth sx={{paddingY:"7.5px"}}>
            ارسال دوره
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default CourseManagement;


