import React, { useMemo } from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormCheckBox from "#/ui/component/common/FormCheckBox";

export default function ContainerRepositoryBox({
  courseItems,
}: {
  courseItems: {
    contentId: string;
    title: string;
    ownerName: string;
    contentState: number;
  };
}) {
  const theme = useTheme();
  const t = useTranslations();

  const schema = useMemo(
    () =>
      yup.object().shape({
        isPublished: yup.boolean(),
      }),
    [t]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  return (
    <>
      <Grid item xs={12} md={6} lg={6}  mt={2}>
        <Grid
          container
          sx={{
            background: theme.palette.background.paper,
            borderRadius: { md: "8px" },
            boxShadow: theme.shadows[2],
            display: "flex",
            flexDirection: "column",
            paddingY: "12px" 
          }}
        >
          <FormProvider {...methods}>
            <FormCheckBox name="isPublished" label={t("Select_cover")} />
          </FormProvider>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginX: "42px",
              gap: "4px",
              marginBottom:"12px",
            }}
          >
            {/* Title */}
            <Typography
              variant={"caption"}
              fontWeight={500}
              display={"block"}
              my={0.2}
            >
              <label style={{ color: theme.palette.grey[700] }}>مدرس: </label>
              {courseItems?.title}
            </Typography>

            {/* Owner */}
            <Typography
              variant={"caption"}
              fontWeight={500}
              display={"block"}
              my={0.2}
            >
              <label style={{ color: theme.palette.grey[700] }}>
                ایجاد کننده:{" "}
              </label>
              {courseItems?.ownerName}
            </Typography>

            {/* Content State */}
            <Typography
              variant={"caption"}
              fontWeight={500}
              display={"block"}
              my={0.2}
            >
              <label style={{ color: theme.palette.grey[700] }}>دسته: </label>
              بازاریابی محتوایی
            </Typography>

            {/* Content Tags */}
            <Box
              sx={{ display: "flex", flexDirection: "row", marginY: "16px" }}
            >
              <Typography
                variant={"caption"}
                color={theme.palette.grey[700]}
                sx={{
                  backgroundColor:
                    courseItems?.contentState === 1
                      ? theme.palette.success.light
                      : theme.palette.warning.light,
                  fontSize: "11px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1,
                  py: 0.2,
                  borderRadius: "12px",
                  marginLeft: theme.direction === "rtl" ? "5px" : "0px",
                  marginRight: theme.direction === "rtl" ? "0" : "5px",
                  marginBottom:"12px"
                }}
              >
                {courseItems?.contentState === 1
                  ? t("تایید شده")
                  : t("در انتضار نایید")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
