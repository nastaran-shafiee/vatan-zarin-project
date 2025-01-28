"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OutLinedTextField } from "#/ui/component/common/OutLinedTextField";
import {
  useGetAllLanguageQuery,
  useGetAllRankQuery,
  useAddCourseMutation,
} from "#/redux/services/CoursesApi";
import { useMemo, useState } from "react";
import { AddContent } from "../component/addContent";
import AddCover from "../component/addCover";
import { Container } from "@mui/material";
import Header from "#/ui/component/common/Header";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CourseManagement = () => {
  const [showAddContent, setShowAddContent] = useState(false); // نمایش AddContent پس از ارسال موفقیت‌آمیز
  const t = useTranslations();

  const schema = useMemo(() => {
    return yup.object({
      coverId: yup.string().required(t("F_PorKardanElzami")),
      title: yup.string().required(t("F_PorKardanElzami")),
      description: yup.string().required(t("F_PorKardanElzami")),
      languageId: yup.string().required(t("F_PorKardanElzami")),
      rankId: yup.string().required(t("F_PorKardanElzami")),
    });
  }, [t]);

  const methods = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  // API hooks
  const { data: languages, isLoading: isLanguagesLoading } =
    useGetAllLanguageQuery();
  const { data: ranks, isLoading: isRanksLoading } = useGetAllRankQuery();
  const [addCourse, { isLoading: isSubmitting }] = useAddCourseMutation();
  const onSubmit = async (data: any) => {
    try {
      const response = await addCourse(data).unwrap(); // ارسال درخواست به API
  
      if (response?.isSuccess) { // اگر کد پاسخ 200 باشد
        setShowAddContent(true); // AddContent نمایش داده شود
      } else {
        alert(t("Unexpected_response_code")); // اگر کد پاسخ متفاوت بود، پیام مناسب نمایش دهید
      }
    } catch (error: any) {
      console.error("Error adding course:", error);
      alert(t("Error_adding_course"));
    }
  };
  const addCoverProps = {
    methods,
    onSubmit,
    isLanguagesLoading,
    languages,
    isRanksLoading,
    ranks,
    setValue,
    errors,
    isSubmitting,
  };
  
  return (
    <>
    <Container maxWidth="md" sx={{ px: 0 }}>
      {/* Header */}
      <Header
        text={t("add_courses")}
        isTheme={false}
        customNode={<ArrowForwardIosIcon width="28px" height="28px" />}
      />
      {/* نمایش AddContent بعد از ارسال موفقیت‌آمیز فرم */}
      {!showAddContent ? (
        <AddContent />
      ) : (
        <AddCover
        {...addCoverProps}
        />
      )}
         </Container>
    </>
  );
};

export default CourseManagement;
