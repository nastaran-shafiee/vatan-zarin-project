import React, { useEffect } from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useWatch, useFormContext } from "react-hook-form";
import FormCheckBox from "#/ui/component/common/FormCheckBox";

type CourseItemType = {
  contentId: string;
  title: string;
  ownerName: string;
  contentState: number;
};

type Props = {
  courseItems: CourseItemType;
  onSelectItem: (contentItem: CourseItemType, isChecked: boolean) => void;
};

const ContainerRepositoryBox: React.FC<Props> = ({
  courseItems,
  onSelectItem,
}) => {
  const theme = useTheme();
  const t = useTranslations();
  const formContext = useFormContext();

  if (!formContext) {
    console.warn("⚠ FormProvider مقداردهی نشده است!");
    return null;
  }

  const { control } = formContext;
  const fieldName = `isPublished_${courseItems.contentId}`; // Unique name for each checkbox

  const isChecked = useWatch({ control, name: fieldName });

  useEffect(() => {
    onSelectItem(courseItems, isChecked);
  }, [isChecked]);

  return (
    <Grid item xs={12} md={6} lg={6} mt={2}>
      <Grid
        container
        sx={{
          background: theme.palette.background.paper,
          borderRadius: { md: "8px" },
          boxShadow: theme.shadows[2],
          display: "flex",
          flexDirection: "column",
          paddingY: "12px",
        }}
      >
        {/* Fix: Use unique field name */}
        <FormCheckBox name={fieldName} label={t("Select_cover")} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginX: "42px",
            gap: "4px",
            marginBottom: "12px",
          }}
        >
          {/* Title */}
          <Typography
            variant={"caption"}
            fontWeight={500}
            display={"block"}
            my={0.2}
          >
            <label style={{ color: theme.palette.grey[700] }}>
              {t("Z_Teacher")}:{" "}
            </label>
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
              {t("Owner")}:{" "}
            </label>
            {courseItems?.ownerName}
          </Typography>

          {/* Content Tags */}
          <Box sx={{ display: "flex", flexDirection: "row", marginY: "16px" }}>
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
                marginBottom: "12px",
              }}
            >
              {courseItems?.contentState === 1?
                t("Approved") : t("Pending_approval")}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContainerRepositoryBox;
