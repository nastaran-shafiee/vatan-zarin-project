
import Header from "#/ui/component/common/Header";
import { Container, Grid, Modal, PropTypes } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FC } from "react";
import { useTranslations } from "next-intl";
type PropType = {
  open: boolean;
  handleOpen: () => void;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "100%",
  bgcolor: "background.paper",
  borderRadius: "15px",
  p: 2,
  minHeight: "100vh ",
  overflow: "hidden",
  overflowY: "auto",
  "& div:last-child": {
    borderBottom: "0px !important",
    mb: 0,
    pb: 0,
  },
};
export const ContentRepositoryModal: FC<PropType> = ({ handleOpen, open }) => {
    const t = useTranslations();

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
        <Container maxWidth="md" sx={{ px: 0 }}>

        <Header
        text={t("List_courses")}
        isTheme={false}
        customNode={
         <CloseIcon onClick={handleOpen} />
        } // Custom back icon
      />
        
          </Container>

        </Grid>
    </Modal>
  );
};
