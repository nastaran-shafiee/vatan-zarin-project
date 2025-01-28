// CourseFormWithCover.tsx
import React from "react";
import { Box, Button, Container, Typography,useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { FormProvider, UseFormReturn, UseFormSetValue } from "react-hook-form";
import FormInputText from "#/ui/component/common/FormTextFiled";
import TextFiledFileUpload from "#/ui/component/common/TextFiledFileUpload";

import FormSelect from "#/ui/component/common/FormSelect";

interface FormData {
  title: string;
  coverId: string;
  description: string;
  languageId: string;
  rankId: string;
}

interface AddCoverProps {
  methods: UseFormReturn<FormData, any, undefined>;
  onSubmit: (data: FormData) => void;
  isLanguagesLoading: boolean;
  languages: any;
  isRanksLoading: boolean;
  ranks: any;
  setValue: UseFormSetValue<FormData>; // Correctly typed setValue
  errors: any;
  isSubmitting: boolean;
}
type comboBox = {
  languageId: string;
  title: string;
  rankId: string;
};

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
}) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    
      <>{/* Cover Upload */}
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
          sizeFile={500 * 1024}
          title={t("Course_Cover")}
          isRequired={true}
          label={t("Add_Cover")}
          allowedFormat={ `${t("Allowed_formats_image")} , ${t("Image_Allowed_volume")}`}
          setId={(fileId: string) => setValue("coverId", fileId)} // Set coverId in form
          iconColor={theme.palette.secondary.main}

        />
      </Box>

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{
              marginTop: "16px",
              marginBottom: "20px",
              bgcolor: "background.paper",
              paddingX: "8px",
              paddingY: "24px",
            }}
          >
            <Typography variant="h6">{t("Course_Information")}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                marginY: "24px",
              }}
            >
              {/* Title */}
              <FormInputText
                label={t("Course_Title")}
                name="title"
                required={true}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              {/* Description */}
              <FormInputText
                label={t("Course_Description")}
                name="description"
                required={true}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              {/* Language Select */}
              <FormSelect
                name="languageId"
                label={t("Course_Language")}
                required={true}
                options={
                  isLanguagesLoading || !languages?.result
                    ? []
                    : languages.result.map(
                        (lang: Omit<comboBox, "rankId">) => ({
                          value: lang.languageId,
                          title: lang.title,
                        })
                      )
                }
              />

              {/* Rank Select */}
              <FormSelect
                name="rankId"
                label={t("Rank")}
                required={true}
                options={
                  isRanksLoading || !ranks?.result
                    ? []
                    : ranks.result.map(
                        (rank: Omit<comboBox, "languageId">) => ({
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
            sx={{
              marginTop: "16px",
              bgcolor: "background.paper",
              paddingX: "8px",
              paddingY: "24px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ paddingY: "7.5px" }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("Submitting") : t("Next-step")}
            </Button>
          </Box>
        </form>
      </FormProvider></>
 
  );
};

export default AddCover;
