"use client";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import ContentRepositoryModal from "./contentRepositoryModal";
import { useAddContentToCourseMutation } from "#/redux/services/CoursesApi";

export const AddContent = ({ courseId }: { courseId: string }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [addContentToCourse, { isLoading: isSubmitting }] = useAddContentToCourseMutation();
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const theme = useTheme();

  const handleOpenModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.log("Selected items updated:", selectedItems);
  }, [selectedItems]);

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
        alert(t("Content_added_successfully"));
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
      <Box
        sx={{
          marginTop: "16px",
          marginBottom: "20px",
          bgcolor: "background.paper",
          paddingX: "16px",
          paddingY: "24px",
          minHeight: "100%",
        }}
      >
        {!open && selectedItems.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            {selectedItems?.map((item) => (
              <Box
                key={item.contentId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1">{item.title}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.filter((i) => i.contentId !== item.contentId)
                    )
                  }
                >
                  حذف
                </Button>
              </Box>
            ))}
          </Box>
        )}
        <Typography
          component="span"
          color="text.primary"
          fontWeight="fontWeightMedium"
          sx={{
            pb: 1,
            display: "block",
            width: "fit-content",
            position: "relative",
            "&::before": {
              content: '"*"',
              position: "absolute",
              top: "-2px",
              left: "-12px",
              color: "error.main",
            },
          }}
        >
          {t("Table_of_Contents")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: { xs: "328px", md: "100%" },
            height: "45px",
            border: "1px dashed #E0E0E0",
            borderRadius: "5px",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={handleOpenModal}
        >
          <AddIcon sx={{ color: theme.palette.grey[700] }} />
          <Typography component="span" color={theme.palette.grey[700]}>
            {t("add-contetn")}
          </Typography>
        </Box>

        {open && (
          <ContentRepositoryModal
            open={open}
            handleOpen={handleOpenModal}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
      </Box>

      <Box
        maxWidth="md"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
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
          onClick={handleSave}
          disabled={isSubmitting}
        >
          ذخیره
        </Button>
      </Box>
    </>
  );
};
