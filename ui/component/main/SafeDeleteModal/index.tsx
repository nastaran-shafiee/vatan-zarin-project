"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { alpha, Button, Grid, styled, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@mui/lab";
import { AcademyIcon } from "../../common/AcademyIcon";

export default function SafeDeleteModal({
  openModal,
  onClose,
  onAccept,
  title,
  message,
  color,
  btnColor,
  icon,
  loading,
}: {
  openModal: any;
  onClose: any;
  onAccept?: any;
  title: string;
  message: string;
  color: string;
  btnColor?: string;
  icon: string;
  loading?: boolean;
}) {
  const theme = useTheme();
  const t = useTranslations();
  return (
    <Modal open={openModal} onClose={onClose} closeAfterTransition>
      <StyledBox>
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: `${alpha(color, 0.2)}`,
            width: "42px",
            height: "42px",

            borderRadius: "50%",
            mx: "auto",
          }}
        >
          <AcademyIcon src={icon} color={`${alpha(color, 1)}`} />
        </Grid>
        <Typography variant={"body1"} fontWeight={600} mt={2} mb={1}>
          {title}
        </Typography>
        <Typography mx={1} variant={"body2"} color={"text.secondary"}>
          {message}
        </Typography>
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          mt={3}
        >
          <LoadingButton
            variant="contained"
            onClick={onAccept}
            loading={loading}
            sx={{
              boxShadow: "none",
              backgroundColor: `${alpha(color, 1)}`,
              color: btnColor ? btnColor : `${theme.palette.grey[100]}`,
              fontSize: "13px",
              "&:hover": {
                backgroundColor: `${alpha(color, 1)}`,
              },
            }}
            role="button"
          >
            {title}
          </LoadingButton>
          <Button
            onClick={onClose}
            sx={{ color: `${theme.palette.grey[700]}`, fontSize: "13px" }}
          >
            {t("H_Enseraf")}
          </Button>
        </Grid>
      </StyledBox>
    </Modal>
  );
}
const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  borderRadius: "8px",
  border: `2px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.background.paper,
  maxHeight: "100%",
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    maxWidth: "600px",
    height: "auto",
    borderRadius: "15px",
    display: "block",
  },
}));
