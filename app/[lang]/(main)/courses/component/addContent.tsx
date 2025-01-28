"use client";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ContentRepositoryModal from "./contentRepositoryModal";
export const AddContent = () => {
  const t = useTranslations();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        marginTop: "16px",
        marginBottom: "20px",
        bgcolor: "background.paper",
        paddingX: "16px",
        paddingY: "24px",
      }}
    >
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
        <ContentRepositoryModal open={open} handleOpen={handleOpenModal} />
      )}
    </Box>
  );
};
