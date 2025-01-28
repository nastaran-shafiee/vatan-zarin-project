
import Header from "#/ui/component/common/Header";
import { Container, Grid, Modal, PropTypes } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FC } from "react";
import { useTranslations } from "next-intl";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type PropType = {
  open: boolean;
  handleOpen: () => void;
};

export const ContentRepositoryModal: FC<PropType> = ({ handleOpen, open }) => {
    const t = useTranslations();

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
    {/* Header */}
    <Header
      text={t("add_courses")}
      isTheme={false}
      customNode={
        <ArrowForwardIosIcon
          width="28px"
          height="28px"
        />
      }
    />

    
  </Container>
  );
};
