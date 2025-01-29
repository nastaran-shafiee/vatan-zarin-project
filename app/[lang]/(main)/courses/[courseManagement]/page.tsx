"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMemo, useState } from "react";
import { Container } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  useGetAllLanguageQuery,
  useGetAllRankQuery,
  useAddCourseMutation,
} from "#/redux/services/CoursesApi";
import { AddContent } from "../component/addContent";
import AddCover from "../component/addCover";
import Header from "#/ui/component/common/Header";
import { useDispatch } from "react-redux";
import {
  setAlert,
  setError,
  setMessage,
} from "#/redux/features/snackBarHandlerSlice";
import { CourseFormData } from "#/redux/services/CoursesApi/courseApi";

const CourseManagement = () => {
  const [showAddContent, setShowAddContent] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const t = useTranslations();
  const dispatch = useDispatch();
  // Define validation schema using yup
  const schema = useMemo(() => {
    return yup.object({
      coverId: yup.string().required(t("F_PorKardanElzami")),
      title: yup.string().required(t("F_PorKardanElzami")),
      description: yup.string().required(t("F_PorKardanElzami")),
      languageId: yup.string().required(t("F_PorKardanElzami")),
      rankId: yup.string().required(t("F_PorKardanElzami")),
    });
  }, [t]);

  // Initialize form handling with react-hook-form and yup resolver
  const methods = useForm<CourseFormData>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  // Fetch language and rank data using Redux Toolkit Query
  const { data: languages, isLoading: isLanguagesLoading } =
    useGetAllLanguageQuery();
  const { data: ranks, isLoading: isRanksLoading } = useGetAllRankQuery();
  const [addCourse, { isLoading: isSubmitting }] = useAddCourseMutation();

  // Handle form submission
  const onSubmit = async (data: CourseFormData) => {
    const params: CourseFormData = {
      ...data,
    };
    addCourse(params)
      .unwrap()
      .then((response) => {
        if (response?.isSuccess) {
          setShowAddContent(true);
          setCourseId(response?.result?.courseId);
        } else {
          dispatch(setAlert(true));
          dispatch(setError(true));
          dispatch(setMessage(response.errors?.[0]?.message));
        }
      });
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
    <Container
      maxWidth="md"
      sx={{ px: 0, position: "relative", overflowY: "scroll" }} 
    >
      {/* Page Header */}
      <Header
        text={t("add_courses")}
        isTheme={false}
        customNode={<ArrowForwardIosIcon width="28px" height="28px" />}
      />

      {/* Show AddContent after successful form submission */}
      {showAddContent ? (
        
        <AddContent courseId={courseId} />
      ) : (
        <AddCover {...addCoverProps} />
      )}
    </Container>
  );
};

export default CourseManagement;
