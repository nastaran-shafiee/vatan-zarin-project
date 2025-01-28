"use client";
import Header from "#/ui/component/common/Header";
import {
  Box,
  Container,
  Grid,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { useGetAllContentQuery } from "#/redux/services/CoursesApi";
import ContainerRepositoryBox from "./containerRepositoryBox";

type PropType = {
  open: boolean;
  handleOpen: () => void;
};

const ContentRepositoryModal: FC<PropType> = ({ handleOpen, open }) => {
  const t = useTranslations();
  const theme = useTheme();
  const { data, isLoading, isError } = useGetAllContentQuery();
console.log(data,"data")
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    borderRadius: "15px",
    bgcolor: theme.palette.grey[300],
    px: 0,
    minHeight: "100vh",
    overflow: "hidden",
    overflowY: "auto",
    "& div:last-child": {
      borderBottom: "0px !important",
      mb: 0,
      pb: 0,
    },
  };

  if (isLoading) {
    return (
      <Modal open={open} onClose={handleOpen}>
        <Grid sx={style}>
          <Container maxWidth="md" sx={{ px: 0 }}>
            <Header
              text={t("List_courses")}
              isTheme={false}
              customNode={<CloseIcon onClick={handleOpen} />} // Custom back icon
            />
            <Box
              sx={{
                marginTop: "16px",
                marginBottom: "20px",
                bgcolor: "background.paper",
                paddingX: "16px",
                paddingY: "24px",
              }}
            >
              <Typography>{t("Loading...")}</Typography>
            </Box>
          </Container>
        </Grid>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal open={open} onClose={handleOpen}>
        <Grid sx={style}>
          <Container maxWidth="md" sx={{ px: 0 }}>
            <Header
              text={t("List_courses")}
              isTheme={false}
              customNode={<CloseIcon onClick={handleOpen} />} // Custom back icon
            />
            <Box
              sx={{
                marginTop: "16px",
                marginBottom: "20px",
                bgcolor: "background.paper",
                paddingX: "16px",
                paddingY: "24px",
              }}
            >
              <Typography>{t("An error occurred while fetching data.")}</Typography>
            </Box>
          </Container>
        </Grid>
      </Modal>
    );
  }

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
            customNode={<CloseIcon onClick={handleOpen} />} // Custom back icon
          />
          <Box
            sx={{
              
              bgcolor: "background.paper",
            
            }}
          >
            {data?.result?.map((item: any) => (
              <ContainerRepositoryBox
                key={item.contentId}
                courseItems={{
                  contentId: item.contentId,
                  title: item.title,
                  ownerName: item.ownerName,
                  contentState: item.contentState,
                }}
              />
            ))}
          </Box>
        </Container>
      </Grid>
    </Modal>
  );
};

export default ContentRepositoryModal;

