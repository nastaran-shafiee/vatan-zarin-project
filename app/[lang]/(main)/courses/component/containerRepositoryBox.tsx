
"use client";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch } from "#/redux/hooks";
import { useTranslations } from "next-intl";
import {
  usePublishMutation,
  useUnPublishMutation,
} from "#/redux/services/CoursesApi";
import {
  setAlert,
  setError,
  setMessage,
  setSuccess,
} from "#/redux/features/snackBarHandlerSlice";
import Switch from "@mui/material/Switch";
import { getAllCourseParamType } from "#/redux/services/CoursesApi/courseApi";
import FormCheckBox from "#/ui/component/common/FormCheckBox";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ContainerRepositoryBox({
  courseItems,
}: {
  courseItems: getAllCourseParamType;
}) {
  const theme = useTheme();
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useUnPublishMutation();

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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          p: 0,
          pb: { xs: 0, md: 1.5 },
        }}
      >
        <Grid
          container
          sx={{
            background: theme.palette.background.paper,
            borderRadius: { md: "8px" },
            boxShadow: theme.shadows[2],
            pt: 1,
            pb: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormProvider {...methods}>
            <FormCheckBox name="isPublished" label="انتخاب کاور" />
          </FormProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginX: "42px",
              gap: "4px",
            }}
          >
            <Typography
              variant={"caption"}
              fontWeight={500}
              display={"block"}
              my={0.2}
            >
              <label style={{ color: theme.palette.grey[700] }}>
                {t("Owner")}:{" "}
              </label>
              {courseItems?.ownerName}
            </Typography>
            <Typography
              variant={"caption"}
              fontWeight={500}
              display={"block"}
              my={0.2}
            >
              <label style={{ color: theme.palette.grey[700] }}>
                {t("Owner")}:
              </label>
              {courseItems?.ownerName}
            </Typography>
            <Typography
              variant={"caption"}
              fontWeight={500}
              display={"block"}
              my={0.2}
            >
              <label style={{ color: theme.palette.grey[700] }}>
                {t("Owner")}:
              </label>
              {courseItems?.ownerName}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row",marginY:"16px" }}>
              <Typography
                variant={"caption"}
                color={theme.palette.grey[700]}
                sx={{
                  backgroundColor: "info.lighter",
                  color: "info.main",
                  fontSize: "11px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1,
                  py: 0.2,
                  borderRadius: "12px",
                  marginLeft: theme.direction === "rtl" ? "5px" : "0px",
                  marginRight: theme.direction === "rtl" ? "0" : "5px",
                }}
              >
                {courseItems?.contentCount} {t("content")}{" "}
              </Typography>
              <Typography
                variant={"caption"}
                color={theme.palette.grey[700]}
                sx={{
                  backgroundColor: "info.lighter",
                  color: "info.main",
                  fontSize: "11px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1,
                  py: 0.2,
                  borderRadius: "12px",
                  marginLeft: theme.direction === "rtl" ? "5px" : "0px",
                  marginRight: theme.direction === "rtl" ? "0" : "5px",
                }}
              >
                {courseItems?.contentCount} {t("content")}{" "}
              </Typography>
            </Box>
          </Box>
  
        </Grid>
      </Grid>
    </>
  );
}
