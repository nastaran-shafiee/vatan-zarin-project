"use client";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import {
  useGetAllLanguageQuery,
  useGetAllRankQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
} from "#/redux/services/CoursesApi";
import { AddContent } from "../component/addContent";
import AddCover from "../component/addCover";
import Header from "#/ui/component/common/Header";
import {
  setAlert,
  setError,
  setMessage,
} from "#/redux/features/snackBarHandlerSlice";
import { CourseFormData } from "#/redux/services/CoursesApi/courseApi";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";

const CourseManagement = () => {
  const { courseManagement } = useParams();
  const isEditMode = courseManagement !== "add";
  const t = useTranslations();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  // Retrieve course information from URL (in edit mode)
  const courseItemsString = searchParams.get("courseItems");
  const courseItems = courseItemsString ? JSON.parse(courseItemsString) : null;
  const [showAddContent, setShowAddContent] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(
    isEditMode ? courseItems?.courseId : null
  );
console.log(courseItems?.courseId);
  // Fetch list of languages and ranks
  const { data: languages, isLoading: isLanguagesLoading } =
    useGetAllLanguageQuery();
  const { data: ranks, isLoading: isRanksLoading } = useGetAllRankQuery();

  // API for adding and updating a course
  const [addCourse, { isLoading: isSubmitting }] = useAddCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  // Validation schema
  const schema = useMemo(() => {
    return yup.object({
      coverId: yup.string().required(t("F_PorKardanElzami")),
      title: yup.string().required(t("F_PorKardanElzami")),
      description: yup.string().required(t("F_PorKardanElzami")),
      languageId: yup.string().required(t("F_PorKardanElzami")),
      rankId: yup.string().required(t("F_PorKardanElzami")),
    });
  }, [t]);

  const defaultValues = useMemo(() => {
    if (isEditMode && courseItems) {
      return {
        coverId: courseItems?.coverImageUrl || "",
        title: courseItems?.title || "",
        description: courseItems?.description || "",
        languageId: courseItems?.languageId || "",
        rankId:
          courseItems.rankTitle === "برنز"
            ? "4ab09cba-fb28-4140-a82a-10926e0acdfa"
            : courseItems.rankTitle === "نقره"
              ? "d299494f-443e-47f3-a31b-619edbb6fe9e"
              : "1db1f063-93aa-4652-b9ab-207fdac7c527",
      };
    }
    return {}; // Default values should be empty when adding a new course
  }, [isEditMode, courseItems]);
  // Initialize form
  const methods = useForm<CourseFormData>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  // Handle form submission (add or update course)
  const onSubmit = async (data: CourseFormData) => {
    if (!isEditMode) {
      addCourse(data)
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
    } else {
      const updateParams = {
        ...data,
        coverImageAddressId: data.coverId,
        demoAddressId: data.coverId,
        courseId: courseItems?.courseId,
      };
      updateCourse(updateParams)
        .unwrap()
        .then((response) => {
          if (response?.isSuccess) {
            setShowAddContent(true);

            dispatch(setAlert(true));
            dispatch(setError(false));
            dispatch(setMessage(t("Course_updated_successfully")));
          } else {
            dispatch(setAlert(true));
            dispatch(setError(true));
            dispatch(setMessage(response.errors?.[0]?.message));
          }
        });
    }
  };

  const addCoverProps = {
    methods,
    onSubmit: handleSubmit(onSubmit as (data: CourseFormData) => void),
    isLanguagesLoading,
    languages,
    isRanksLoading,
    ranks,
    setValue,
    errors,
    isSubmitting: isSubmitting || isUpdating,
    courseItems,
  };

  const textHeader =
  !isEditMode? t("add_courses") : t("Z_Edit_Course");

  return (
    <Container
      maxWidth="md"
      sx={{ px: 0, position: "relative", overflowY: "scroll" }}
    >
      {/* Page header */}
      <Header
        text={textHeader}
        isTheme={false}
        customNode={<AcademyIcon src={"icon-typeChevrone-right-solid"} />}
      />

      {/* Show AddContent after successful submission */}
      {showAddContent ? (
        <AddContent courseId={courseId} isEditMode={isEditMode} />
      ) : (
        <AddCover {...addCoverProps} />
      )}
    </Container>
  );
};

export default CourseManagement;
