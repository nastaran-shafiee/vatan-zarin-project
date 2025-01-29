"use client";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import ContentRepositoryModal from "./contentRepositoryModal";
import { useAddContentToCourseMutation } from "#/redux/services/CoursesApi";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";

export const AddContent = ({ courseId }: { courseId: string }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [addContentToCourse, { isLoading: isSubmitting }] =
    useAddContentToCourseMutation();
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


function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0'); // ساعت
  const minutes = now.getMinutes().toString().padStart(2, '0'); // دقیقه
  return `${hours}.${minutes}`;
}
  return (
    <>
      <Box
        sx={{
          marginTop: "16px",
          marginBottom: "20px",
          bgcolor: "background.paper",
          paddingX: "16px",
          paddingY: "24px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
         
          <Typography
            variant="body1"
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
      
        {!open && selectedItems.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {selectedItems?.map((item) => (
              <Box
                key={item.contentId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingX: "16px",
                  paddingY: "12px",
                  borderRadius: "8px",
                  backgroundColor: "background.neutral",
                  boxShadow: 1,
                }}
              >
                <Box sx={{ dispaly: "flex", flexDirection: "column"}}>
                  <Typography variant="body1" sx={{marginBottom:"10px"}}>{item.title}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                <IconButton
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.filter((i) => i.contentId !== item.contentId)
                    )
                  }
                  sx={
                    {width:"14px",height:"14px"}
                  }
                >
                  <AcademyIcon
                    src={"icon-clock---regular"}
                    color={"text.secondary"}
                    
                  />
                </IconButton>
                <Typography color={"text.secondary"}>{getCurrentTime()}</Typography>
                <Typography
                 component={"span"}
                    sx={{
                      backgroundColor:
                        item?.contentState === 1
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
                    {item?.contentState === 1
                      ? t("تایید شده")
                      : t("در انتضار نایید")}
                  </Typography>
                </Box>
                </Box>
                <IconButton
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.filter((i) => i.contentId !== item.contentId)
                    )
                  }
                >
                  <AcademyIcon
                    src={"icon-typetrash-can"}
                    color={theme.palette.secondary.main}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
       
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
            {t("add-content")}
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
          margin: "0 auto",
          position: "fixed", // تغییر به sticky
          bottom: 0, // چسبیدن به پایین صفحه
          width: { xs: "360px", md: "790px" },
          bgcolor: "background.paper",
          paddingX: "8px",
          paddingY: "24px",
          zIndex: 10, // برای اطمینان از اینکه در روی سایر عناصر قرار گیرد
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
