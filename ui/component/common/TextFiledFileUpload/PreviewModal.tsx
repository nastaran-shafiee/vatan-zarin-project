"use client";
import React, { FC } from "react";
import { Modal, styled, IconButton, Grid, useTheme } from "@mui/material";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";
import ReactPlayer from "react-player";

const PrviewImage = styled("img")({
  width: "100%",
  maxHeight: "200px",
  maxWidth: "200px",
  display: "flex",
  alignItems: "center",
  margin: "auto",
  borderRadius: "10px",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350,
  bgcolor: "background.paper",
  borderRadius: "15px",
  p: 2,
  maxHeight: "500px",
  overflow: "hidden",
  overflowY: "auto",
  "& div:last-child": {
    borderBottom: "0px !important",
    mb: 0,
    pb: 0,
  },
};
type PropType = {
  open: boolean;
  handleOpen: () => void;
  typeFile?: string;
  preview?: string;
  previewUrl: any;
};

export const PreviewModal: FC<PropType> = ({
  typeFile = "",
  open,
  handleOpen,
  preview,
  previewUrl,
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={() => {
        handleOpen();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={style}>
        <IconButton onClick={handleOpen} sx={{ display: "flex", mr: "auto" }}>
          <AcademyIcon
            src="icon-x-mark"
            color={theme.palette.secondary.main}
            fontSize="28px"
          />
        </IconButton>
        <Grid
          sx={{
            borderBottom: "1px solid",
            borderColor: "info.light",
            mb: 1.5,
            pb: 1.5,
          }}
        >
          <PrviewImage src={preview} alt="image" />
        </Grid>
      </Grid>
    </Modal>
  );
};
