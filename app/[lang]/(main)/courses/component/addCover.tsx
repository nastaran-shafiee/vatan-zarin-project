"use client";
import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import FormInputText from "#/ui/component/common/FormTextFiled";
import TextFiledFileUpload from "#/ui/component/common/TextFiledFileUpload";
import FormSelect from "#/ui/component/common/FormSelect";
import { AddCoverProps } from "../corses";

const AddCover: React.FC<AddCoverProps> = ({
  methods,
  onSubmit,
  isLanguagesLoading,
  languages,
  isRanksLoading,
  ranks,
  setValue,
  errors,
  isSubmitting,
  courseItems,
}) => {
  const t = useTranslations();
  const theme = useTheme();
  console.log
  return (
    <>
      {/* Cover Upload */}
      <Box mt={2} mb={3} bgcolor="background.paper" px={2} py={3}>
        <TextFiledFileUpload
          sizeFile={500 * 1024}
          title={t("Course_Cover")}
          isRequired
          label={t("Add_Cover")}
          allowedFormat={`${t("Allowed_formats_image")} , ${t("Image_Allowed_volume")}`}
          setId={(fileId) => setValue("coverId", fileId)}
          iconColor={theme.palette.secondary.main}
          previewValue={courseItems?.coverImageUrl}
        />
      </Box>
      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box mt={2} mb={3} bgcolor="background.paper" px={2} py={3}>
            <Typography variant="h6">{t("Course_Information")}</Typography>

            <Box display="flex" flexDirection="column" gap={2} my={3}>
              {/* Title */}
              <FormInputText
                label={t("Course_Title")}
                name="title"
                required
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />

              {/* Description */}
              <FormInputText
                label={t("Course_Description")}
                name="description"
                required
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />

              {/* Language Select */}
              <FormSelect
                defaultValue={courseItems?.languageId}
                name="languageId"
                label={t("Course_Language")}
                required
                options={
                  isLanguagesLoading || !languages?.result
                    ? []
                    : languages.result.map(
                        (lang: { languageId: string; title: string }) => ({
                          value: lang.languageId,
                          title: lang.title,
                        })
                      )
                }
              />

              {/* Rank Select */}
              <FormSelect
                selectedValue="rankId"
                defaultValue={courseItems?.rankId}
                name="rankId"
                label={t("Rank")}
                required
                options={
                  isRanksLoading || !ranks?.result
                    ? []
                    : ranks?.result.map(
                        (rank: { rankId: string; title: string }) => ({
                          value: rank.rankId,
                          title: rank.title,
                        })
                      )
                }
              />
            </Box>
          </Box>

          {/* Submit Button */}
          <Box
            mt={2}
            bgcolor="background.paper"
            px={2}
            py={3}
            position="sticky"
            bottom={0}
            width="100%"
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1 }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("Submitting") : t("Next-step")}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default AddCover;
