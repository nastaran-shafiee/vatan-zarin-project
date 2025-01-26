"use client";
import {
  Box,
  Modal,
  Stack,
  Typography,
  IconButton,
  alpha,
  useTheme,
  Container,
  RadioGroup,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";

import { useParams, usePathname, useRouter } from "next/navigation";
import { AcademyIcon } from "../AcademyIcon";

const WareHouseSelectionModal = ({ openModal, onClose }: any) => {
  const t = useTranslations();

  const { lang } = useParams();
  const theme = useTheme();
  const pathName = usePathname();
  const router = useRouter();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const style = {
    bgcolor: "background.paper",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  };
  const listItems = [
    {
      id: 1,
      locale: "fa",
      icon: "https://file.pmlm.ir/content/image/icons/type=image-light.svg",
      title: "فارسی",
    },
    {
      id: 2,
      locale: "ar",
      icon: "https://file.pmlm.ir/content/image/icons/type=image-light.svg",
      title: "العربیه",
    },
    {
      id: 3,
      locale: "en",
      icon: "https://file.pmlm.ir/content/image/icons/type=image-light.svg",
      title: "English",
    },
  ];

  return (
    <Modal open={openModal} onClose={onClose}>
      <Container maxWidth="md" sx={{ px: 0 }}>
        <StyledBox sx={style}>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Stack flexGrow={1}>
              <Typography
                variant="subtitle1"
                // sx={{ color: `${alpha(theme.palette.primary.main, 0.8)}` }}
              >
                {t("Z_Default_language")}
              </Typography>
            </Stack>

            <Stack>
              <IconButton sx={{ border: 0 }} size="small" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Grid sx={{ p: 3 }}>
            <Typography variant="h2" mb={3} fontSize={"larger"}>
              {t("chooseLanguage")}
            </Typography>
            <RadioGroup defaultValue="Companyq" name="radio-buttons-group">
              {listItems.map((listItem, index, locale) => (
                <Button
                  color="inherit"
                  fullWidth
                  key={index}
                  onClick={() =>
                    router.replace(redirectedPathName(listItem.locale))
                  }
                  sx={{
                    p: 2,
                    my: 1,
                    borderRadius: "11px",
                    background: `${alpha(theme.palette.common.black, 0.05)}`,
                    border: "0px",
                    borderBottom:
                      lang === listItem.locale
                        ? `2px solid ${theme.palette.primary.main}`
                        : `0px`,
                  }}
                >
                  <Grid container>
                    <Grid
                      xs={10}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Avatar src={listItem.icon} alt={listItem.title}></Avatar>
                      <Typography variant={"caption"} mr={2} fontSize={"large"}>
                        {listItem.title}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={2}
                      sx={{
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      {lang === listItem.locale && (
                        <AcademyIcon
                          src={"icon-typecircle-check-solid"}
                          color={theme.palette.success.main}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Button>
              ))}
            </RadioGroup>
          </Grid>
        </StyledBox>
      </Container>
    </Modal>
  );
};
export default WareHouseSelectionModal;

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  borderRadius: "15px",
  backgroundColor: theme.palette.background.paper,
  maxHeight: "70%",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "50vw",
    height: "auto",
    display: "block",
  },
}));
