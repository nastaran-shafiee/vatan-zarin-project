"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import { useTranslations } from "next-intl";
import AddIcon from "@mui/icons-material/Add";
import ContentRepositoryModal from "./contentRepositoryModal";
import { useAddContentToCourseMutation } from "#/redux/services/CoursesApi";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";
import SelectedItemContent from "./selectedItemContent";
import { useRouter } from "next/navigation";

// Function to get the current time in the format 'HH.MM'
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // Hour
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Minute
  return `${hours}:${minutes}`;
}

export const AddContent = ({ courseId }: { courseId: string }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [addContentToCourse, { isLoading: isSubmitting }] =
    useAddContentToCourseMutation();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const theme = useTheme();

  // Toggle modal visibility
  const handleOpenModal = () => {
    setOpen(!open);
  };
  console.log(courseId);
  // Handle saving content
  const handleSave = async () => {
    try {
      const contentPayload = selectedItems.map((item) => ({
        contentId: item.contentId,
      }));

      const response = await addContentToCourse({
        courseId,
        contents: contentPayload,
      }).unwrap();

      if (response?.isSuccess) {
        router.push("/courses");
      } else {
        alert(t("Unexpected_response_code"));
      }
    } catch (error) {
      console.error("Error adding content to course:", error);
      alert(t("Error_adding_content"));
    }
  };

  return (
    <>
      {/* Table of Contents Section */}
      <Box
        component="section"
        mt={2}
        mb={3}
        bgcolor="background.paper"
        px={2}
        py={3}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography
          variant="body1"
          color="text.primary"
          fontWeight="fontWeightMedium"
          pb={1}
          display="block"
          width="fit-content"
          position="relative"
        >
          <Box
            component="span"
            sx={{
              position: "absolute",
              top: "-2px",
              left: "-12px",
              color: "error.main",
            }}
          >
            *
          </Box>
          {t("Table_of_Contents")}
        </Typography>

        {/* Show selected items if there are any */}
        {!open && selectedItems.length > 0 && (
          <Box display="flex" flexDirection="column" gap={1}>
            {selectedItems?.map((item) => (
              <SelectedItemContent
                key={item.contentId}
                item={item}
                setSelectedItems={setSelectedItems}
                getCurrentTime={getCurrentTime}
                theme={theme}
                t={t}
              />
            ))}
          </Box>
        )}

        {/* Add Content Button */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={45}
          border={1}
          borderRadius={1}
          gap={2}
          sx={{ cursor: "pointer", border: "1px dashed #E0E0E0" }}
          onClick={handleOpenModal}
        >
          <AddIcon sx={{ color: theme.palette.grey[700] }} />
          <Typography color={theme.palette.grey[700]}>
            {t("add-content")}
          </Typography>
        </Box>

        {/* Content Repository Modal */}
        {open && (
          <ContentRepositoryModal
            open={open}
            handleOpen={handleOpenModal}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
      </Box>

      {/* Save Button */}
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
          onClick={handleSave}
          disabled={isSubmitting}
          sx={{ py: 1 }}
        >
          {t("S_Save")}
        </Button>
      </Box>
    </>
  );
};
