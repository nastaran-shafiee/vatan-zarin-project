"use client";
import Header from "#/ui/component/common/Header";
import { Box, Container, Grid, LinearProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FileUpload from "#/ui/component/common/FileUpload";
const CourseManagement = () => {
  const params = useParams();
  const courseManagement = params?.courseManagement;
  const router = useRouter();
  const t = useTranslations();

"use client";
import Header from "#/ui/component/common/Header";
import { Box, Container, Grid, LinearProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextFiledFileUpload from "#/ui/component/common/TextFiledFileUpload";
const CourseManagement = () => {
  const params = useParams();
  const courseManagement = params?.courseManagement;
  const router = useRouter();
  const t = useTranslations();


  return (
    <>
      <Header
        text={t("List_courses")}
        isTheme={false}
        customNode={
          <ArrowForwardIosIcon
            width="28px"
            height="28px"
            onClick={() => router.back()}
          />
        } // Custom back icon
      />

      <Container fixed sx={{ "&.MuiContainer-root": { px: 0 } }}>
        <Box
          sx={{
            width: "100%",
            marginTop:"16px",
            marginBottom: "20px",
            bgcolor: "background.paper",
            paddingX:"8px", 
            paddingY:"24px"
          }}
        >
         
          <TextFiledFileUpload  title="کاور" isRequired={true}  label="افزودن کاور" />
        </Box>
      </Container>
    </>
  );
};

export default CourseManagement;


