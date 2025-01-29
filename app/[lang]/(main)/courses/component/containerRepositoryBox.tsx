import React, { useEffect } from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
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

const ContainerRepositoryBox: React.FC<Props> = ({ courseItems, onSelectItem }) => {
  const theme = useTheme();
  const t = useTranslations();
  const formContext = useFormContext();

  if (!formContext) {
    console.warn("⚠ FormProvider مقداردهی نشده است!");
    return null;
  }

  const { control } = formContext;
  const isChecked = useWatch({ control, name: `isPublished_${courseItems.contentId}` });

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
        <FormCheckBox
          name={`isPublished_${courseItems.contentId}`}
          label={t("Select_cover")}
        />
        <Box sx={{ marginX: "42px", gap: "4px", marginBottom: "12px" }}>
          <Typography variant="caption" fontWeight={500}>
            <label style={{ color: theme.palette.grey[700] }}>مدرس: </label>
            {courseItems.title}
          </Typography>
          <Typography variant="caption" fontWeight={500}>
            <label style={{ color: theme.palette.grey[700] }}>ایجاد کننده: </label>
            {courseItems.ownerName}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContainerRepositoryBox;
