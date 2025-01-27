"use client";
import { changeTheme } from "#/redux/features/settingSlice";
import { useAppDispatch, useAppSelector } from "#/redux/hooks";
import { useGetAllCourseQuery } from "#/redux/services/CoursesApi";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";
import Header from "#/ui/component/common/Header";
import CourseBox from "#/ui/component/main/CourseBox";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";


export default function Courses() {
  const router = useRouter();
  const t = useTranslations();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: getAllCourses, isLoading } = useGetAllCourseQuery();
  const themeIcon = window.localStorage.getItem("pmlm-dark-theme");
  const { lang } = useParams();

// function for add course
const handleAddClick=()=>{
  router.push(`/${lang}/courses/add`);
}

  return (
    <>
      <Header
        text={t("List_courses")}
        changeTheme={() => dispatch(changeTheme())}
        themeIcon={themeIcon || ""}
      />
    
      <Container fixed sx={{ "&.MuiContainer-root": { px: 0 } }}>
        {" "}
        {isLoading && <LinearProgress />}
        <Grid container display="flex" justifyContent="space-between" mt={2}>
          {getAllCourses?.result?.map((courseItems: any, index: number) => (
            <CourseBox courseItems={courseItems} key={index} />
          ))}
          {getAllCourses?.result?.length === 0 && (
            <>
              <Typography
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.background.paper,
                  width: "100%",
                  p: 5,
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                {t("Data_Not_Found")} !
              </Typography>
            </>
          )}
        </Grid>
      </Container>
      <LoadingButton
        sx={{
          position: "fixed",
          left: theme.direction === "rtl" ? "20px" : "auto",
          right: theme.direction === "rtl" ? "auto" : "20px",
          bottom: "20px",
          boxShadow: theme.shadows[12],
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
          },
          minWidth: "56px",
          minHeight: "56px",
          borderRadius: "50%",
        }}
        onClick={handleAddClick}
      >
        <AcademyIcon
          src={"icon-plus"}
         
        />
      </LoadingButton>
    </>
  );
}
