"use client";
import Header from "#/ui/component/common/Header";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetAllContentQuery } from "#/redux/services/CoursesApi";
import ContainerRepositoryBox from "./containerRepositoryBox";
import { useForm, FormProvider } from "react-hook-form";

type PropType = {
  open: boolean;
  handleOpen: () => void;
};

const ContentRepositoryModal: FC<PropType> = ({
  handleOpen,
  open,
  selectedItems,
  setSelectedItems,
}) => {
  const t = useTranslations();
  const theme = useTheme();
  const { data, isLoading, isError } = useGetAllContentQuery();

  const handleSelectItem = (
    contentItem: CourseItemType,
    isChecked: boolean
  ) => {
    setSelectedItems((prev) => {
      return isChecked
        ? [...prev, contentItem] // ذخیره کل آبجکت
        : prev.filter((item) => item.contentId !== contentItem.contentId); // حذف آبجکت
    });

    // انتقال handleOpen خارج از setState
  };

  const methods = useForm(); // مقداردهی صحیح `useForm()`

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    borderRadius: "15px",
    bgcolor: theme.palette.grey[300],
    px: 0,
    minHeight: "100vh",
    overflowY: "auto",
  };

  return (
    <Modal open={open} onClose={handleOpen}>
      <Grid sx={style}>
        <Container maxWidth="md" sx={{ px: 0 }}>
          <Header
            text={t("List_courses")}
            isTheme={false}
            customNode={<CloseIcon onClick={handleOpen} />}
          />
          <Box sx={{ bgcolor: "background.paper" }}>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(() =>
                  console.log(selectedItems)
                )}
              >
                {isLoading ? (
                  <Typography>{t("Loading...")}</Typography>
                ) : isError ? (
                  <Typography>
                    {t("An error occurred while fetching data.")}
                  </Typography>
                ) : (
                  data?.result?.map((item: any) => (
                    <ContainerRepositoryBox
                      key={item.contentId}
                      courseItems={item}
                      onSelectItem={handleSelectItem}
                    />
                  ))
                )}
                <Box
                  sx={{
                    marginTop: "16px",
                    bgcolor: "background.paper",
                    paddingX: "8px",
                    paddingY: "24px",
                    position: "sticky",
                    bottom: 0,
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ paddingY: "7.5px" }}
                    onClick={handleOpen}
                  >
                    افزودن محتوا
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Container>
      </Grid>
    </Modal>
  );
};

export default ContentRepositoryModal;
