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
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// Type for the content item
interface CourseItemType {
  contentId: string;
  title: string;
  description: string;
}

interface ContentRepositoryModalProps {
  open: boolean;
  handleOpen: () => void;
  selectedItems: CourseItemType[];
  setSelectedItems: React.Dispatch<React.SetStateAction<CourseItemType[]>>;
}

const ContentRepositoryModal: FC<ContentRepositoryModalProps> = ({
  open,
  handleOpen,
  selectedItems,
  setSelectedItems,
}) => {
  const t = useTranslations();
  const theme = useTheme();
  const { data, isLoading, isError } = useGetAllContentQuery();

  // Handle item selection for adding/removing content
  const handleSelectItem = (
    contentItem: CourseItemType,
    isChecked: boolean
  ) => {
    setSelectedItems((prev) => {
      return isChecked
        ? [...prev, contentItem] // Add the item if checked
        : prev.filter((item) => item.contentId !== contentItem.contentId); // Remove the item if unchecked
    });
  };

  const methods = useForm(); // Using React Hook Form for form handling

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    borderRadius: "15px",
    bgcolor: theme.palette.grey[300],
    px: 0,
    zIndex: 1200,
    minHeight: "100vh",
  };

  return (
    <Modal open={open} onClose={handleOpen}>
      <Grid sx={style}>
        <Container maxWidth="md" sx={{ px: 0, overflowY: "scroll" }}>
          <Header
            text={selectedItems.length > 0 ? t("Z_Add_Contents") : ""}
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
                {/* Loading or Error Message */}
                {isLoading ? (
                  <Typography>{t("Loading...")}</Typography>
                ) : isError ? (
                  <Typography>{t("An error occurred while fetching data.")}</Typography>
                ) : (
                  // Map through the fetched content items and render them
                  data?.result?.map((item: CourseItemType) => (
                    <ContainerRepositoryBox
                      key={item.contentId}
                      courseItems={item}
                      onSelectItem={handleSelectItem}
                    />
                  ))
                )}

                {/* Show a button if there are selected items */}
                {selectedItems.length > 0 && (
                  <Box
                    component="section"
                    maxWidth="md"
                    margin="0 auto"
                    position="fixed"
                    bottom={0}
                    width={{ xs: "360px", md: "790px" }}
                    bgcolor="background.paper"
                    px={2}
                    py={3}
                    zIndex={10}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ paddingY: "7.5px" }}
                      onClick={handleOpen} // Close the modal on click
                    >
                      {t("Z_Add_Contents")}
                    </Button>
                  </Box>
                )}
              </form>
            </FormProvider>
          </Box>
        </Container>
      </Grid>
    </Modal>
  );
};

export default ContentRepositoryModal;
