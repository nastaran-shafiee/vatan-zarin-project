"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import AddIcon from "@mui/icons-material/Add";
import ContentRepositoryModal from "./contentRepositoryModal";
import {
  useAddContentToCourseMutation,
  useGetCourseContentByIdQuery,
} from "#/redux/services/CoursesApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "#/redux/hooks";
import {
  setAlert,
  setError,
  setMessage,
} from "#/redux/features/snackBarHandlerSlice";
import { AddContentProps, CourseItemType } from "../corses";
import SelectedItemContent from "./selectedItemContent";

// Function to get the current time
function getCurrentTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export const AddContent: React.FC<AddContentProps> = ({
  courseId,
  isEditMode,
}) => {
  const [selectedItems, setSelectedItems] = useState<CourseItemType[]>([]);
  const [addContentToCourse, { isLoading: isSubmitting }] =
    useAddContentToCourseMutation();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Fetch course content in edit mode
  const { data: courseContent, isSuccess } = useGetCourseContentByIdQuery(
    { courseId: courseId ?? "" },
    { skip: !isEditMode || !courseId } // Execute request only in edit mode
  );

  useEffect(() => {
    if (isSuccess && courseContent?.isSuccess) {
      setSelectedItems(courseContent?.result as unknown as CourseItemType[]);
    }
  }, [courseContent, isSuccess]);

  // Open and close modal
  const handleOpenModal = () => {
    setOpen(!open);
  };

  // Save content
  const handleSave = async () => {
    if (!courseId) {
      alert(t("Course_ID_is_missing"));
      return;
    }

    if (selectedItems.length === 0) {
      dispatch(setAlert(true));
      dispatch(setError(true));
      dispatch(setMessage(t("F_EntekhabElzami")));
      return;
    }

    const contentPayload = selectedItems.map((item: CourseItemType) => ({
      contentId: item.contentId ?? "",
    }));

    addContentToCourse({
      courseId,
      contents: contentPayload,
    })
      .unwrap()
      .then((response) => {
        if (response?.isSuccess) {
          router.push("/courses");
        } else {
          dispatch(setAlert(true));
          dispatch(setError(true));
          dispatch(setMessage(t(response.errors?.[0]?.message)));
        }
      });
  };
  return (
    <>
      {/* Content list section */}
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
        maxHeight={"100vh"}
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
            position="absolute"
            top="-2px"
            left="-12px"
            color="error.main"
          >
            *
          </Box>
          {t("Table_of_Contents")}
        </Typography>

        {/* Display selected items */}
        {!open && selectedItems.length > 0 && (
          <Box display="flex" flexDirection="column" gap={1}>
            {selectedItems?.map((item) => (
              <SelectedItemContent
                key={item?.contentId}
                item={item}
                setSelectedItems={setSelectedItems}
                getCurrentTime={getCurrentTime}
                theme={theme}
                t={t}
              />
            ))}
          </Box>
        )}

        {/* Add content button */}
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

        {/* Content selection modal */}
        {open && (
          <ContentRepositoryModal
            open={open}
            handleOpen={handleOpenModal}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
      </Box>

      {/* Save button */}
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
