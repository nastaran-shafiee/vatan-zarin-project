import {
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch } from "#/redux/hooks";
import { useTranslations } from "next-intl";
import {
  usePublishMutation,
  useUnPublishMutation,
} from "#/redux/services/CoursesApi";
import {
  setAlert,
  setError,
  setMessage,
  setSuccess,
} from "#/redux/features/snackBarHandlerSlice";
import Switch from "@mui/material/Switch";
import SafeDeleteModal from "../SafeDeleteModal";
import { getAllCourseParamType } from "#/redux/services/CoursesApi/courseApi";
import { AcademyIcon } from "../../common/AcademyIcon";

export default function CourseBox({
  courseItems,
}: {
  courseItems: getAllCourseParamType;
}) {
  const theme = useTheme();
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openUnPublishedModal, setOpenUnPublishedModal] = useState(false);
  const [openPublishedModal, setOpenPublishedModal] = useState(false);
  const [published, { isLoading: isPublish }] = usePublishMutation();
  const [unPublished, { isLoading: isUnPublished }] = useUnPublishMutation();

  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const TimeHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setOpenPublishedModal(true);
    } else {
      setOpenUnPublishedModal(true);
    }
  };

  const handlePublished = (courseId: any) => {
    published({
      courseId: courseId,
    })
      .unwrap()
      .then((response: any) => {
        if (response?.isSuccess) {
          dispatch(setAlert(true));
          dispatch(setSuccess(true));
          dispatch(
            setMessage(
              response?.errors[0]?.message
                ? t(response?.errors[0].message)
                : t("S_SuccessOperation")
            )
          );
        } else {
          dispatch(setAlert(true));
          dispatch(setError(true));
          dispatch(
            setMessage(
              response?.errors[0]?.message
                ? t(response?.errors[0].message)
                : t("S_FailedOperation")
            )
          );
        }
        setOpenPublishedModal(false);
      })
      .catch(() => {});
  };

  const handleUnPublished = (courseId: any) => {
    unPublished({
      courseId: courseId,
    })
      .unwrap()
      .then((response: any) => {
        if (response?.isSuccess) {
          dispatch(setAlert(true));
          dispatch(setSuccess(true));

          dispatch(
            setMessage(
              response?.errors[0]?.message
                ? t(response?.errors[0].message)
                : t("S_SuccessOperation")
            )
          );
        } else {
          dispatch(setAlert(true));
          dispatch(setError(true));
          dispatch(
            setMessage(
              response?.errors[0]?.message
                ? t(response?.errors[0].message)
                : t("S_FailedOperation")
            )
          );
        }
        setOpenUnPublishedModal(false);
      })
      .catch(() => {});
  };

  return (
    <>
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          pt: 0,
          pb: { xs: 0, md: 1.5 },
          px: { xs: 0, md: 0.8 },
        }}
      >
        <Grid
          container
          sx={{
            background: theme.palette.background.paper,
            borderRadius: { md: "8px" },
            boxShadow: theme.shadows[2],
            pt: 1,
            pb: 2,
          }}
        >
          <Grid xs={3} pt={1.5} px={1.5}>
            <Image
              src={courseItems?.coverImageUrl}
              alt={"image"}
              width={80}
              height={54}
            />
          </Grid>

          <Grid xs={9} position={"relative"}>
            <Stack
              sx={[
                theme.direction === "rtl"
                  ? { left: "10px" }
                  : { right: "10px" },
                { position: "absolute", mt: 1 },
              ]}
            >
              <>
                <Button
                  id="dropDownBtn"
                  aria-controls={open ? "dropDown-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={[
                    {
                      height: "auto",
                      p: 0,
                      minWidth: "auto",
                    },
                  ]}
                >
                  <AcademyIcon
                    src={"icon-ellipsis-vertical"}
                    color={theme.palette.grey[700]}
                    fontSize={"22px"}
                  />
                </Button>
                <Menu
                  id="dropDown-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "dropDownBtn" }}
                  sx={{
                    "& .MuiList-root.MuiMenu-list": { py: 0.5, px: 0 },
                  }}
                >
                  <MenuItem>
                    <Typography
                      variant="caption"
                      display={"flex"}
                      fontWeight={500}
                      alignItems={"center"}
                    >
                      <AcademyIcon fontSize={"20px"} src={"icon-pen"} />{" "}
                      {t("H_Virayesh")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            </Stack>

            <Grid container flexDirection={"row"}>
              <Grid item xs={12}>
                <Grid
                  mt={1}
                  flexDirection={"row"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Grid sx={{ width: "90%" }}>
                    <Typography
                      variant={"body2"}
                      fontWeight={500}
                      sx={{
                        maxWidth: "100%",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        "-webkit-box-orient": "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {courseItems?.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid py={1}>
                  <Typography
                    variant={"caption"}
                    color={theme.palette.grey[700]}
                    sx={{
                      backgroundColor: "info.lighter",
                      color: "info.main",
                      fontSize: "11px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 1,
                      py: 0.2,
                      borderRadius: "12px",
                      marginLeft: theme.direction === "rtl" ? "5px" : "0px",
                      marginRight: theme.direction === "rtl" ? "0" : "5px",
                    }}
                  >
                    {courseItems?.contentCount} {t("content")}{" "}
                  </Typography>
                </Grid>
                <Typography
                  variant={"caption"}
                  fontWeight={500}
                  display={"block"}
                  my={0.2}
                >
                  <label style={{ color: theme.palette.grey[700] }}>
                    {t("Owner")}:{" "}
                  </label>
                  {courseItems?.ownerName}
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={courseItems?.isPublish}
                        onChange={TimeHandleChange}
                      />
                    }
                    label={
                      courseItems?.isPublish ? t("published") : t("Non_release")
                    }
                    sx={{
                      mt: 1.5,
                      "&.MuiFormControlLabel-root": { marginX: 0 },
                      "& .MuiTypography-root": {
                        fontSize: "12px",
                        mr: theme.direction === "rtl" ? 1 : 0,
                        ml: theme.direction === "rtl" ? 0 : 1,
                      },
                      "& .mui-11j8p9-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "info.dark",
                          opacity: 1,
                        },
                      "& .MuiSwitch-track": {
                        backgroundColor: theme.palette.grey[500],
                      },
                      "&.MuiSwitch-root,& .MuiSwitch-root": {
                        height: "20px",
                        width: "39px",
                        borderRadius: "25px",
                        p: 0,
                      },
                      "& .MuiButtonBase-root.MuiSwitch-switchBase": {
                        p: 0,
                      },
                      "& .MuiSwitch-thumb": {
                        width: "18px",
                        height: "18px",
                        color: "white",
                        boxShadow: "none",
                        mt: "1px",
                      },
                    }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SafeDeleteModal
        title={t("Non_publication_course")}
        message={t("sure_course_not_published")}
        color={theme.palette.warning.main}
        btnColor={theme.palette.common.black}
        icon={"icon-Circle-Info"}
        openModal={openUnPublishedModal}
        onClose={() => {
          setOpenUnPublishedModal(false);
        }}
        loading={isUnPublished}
        onAccept={() => handleUnPublished(courseItems?.courseId)}
      />
      <SafeDeleteModal
        title={t("Release_period")}
        message={t("sure_course_published")}
        color={theme.palette.warning.main}
        btnColor={theme.palette.common.black}
        icon={"icon-Circle-Info"}
        openModal={openPublishedModal}
        onClose={() => {
          setOpenPublishedModal(false);
        }}
        loading={isPublish}
        onAccept={() => handlePublished(courseItems?.courseId)}
      />
    </>
  );
}
