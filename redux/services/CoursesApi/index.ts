import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeaders from "#/redux/prepareHeaders";
import {
  CourseIdParamsType,
  response,
  responsePublish,
  responseUnPublish,
} from "./courseApi";

export const courseApi = createApi({
  reducerPath: "courseApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_HOST + "/Courses",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["getAllCourse", "getAllRank", "getAllLanguage", "getAllContent"],
  endpoints: (builder) => ({
    getAllCourse: builder.query<response, void>({
      query: () => ({
        url: `/getAllCourse`,
        method: "GET",
      }),
      providesTags: ["getAllCourse"],
    }),
    getAllRank: builder.query<response, void>({
      query: () => ({
        url: `/getAllRank`,
        method: "GET",
      }),
      providesTags: ["getAllRank"],
    }),
    getAllLanguage: builder.query<response, void>({
      query: () => ({
        url: `/getAllLanguage`,
        method: "GET",
      }),
      providesTags: ["getAllLanguage"],
    }),
    publish: builder.mutation<responsePublish, CourseIdParamsType>({
      query: ({ courseId }: CourseIdParamsType) => ({
        url: `/${courseId}/publish`,
        method: "POST",
      }),
      invalidatesTags: ["getAllCourse"],
    }),

    unPublish: builder.mutation<responseUnPublish, CourseIdParamsType>({
      query: ({ courseId }: CourseIdParamsType) => ({
        url: `/${courseId}/unPublish`,
        method: "POST",
      }),
      invalidatesTags: ["getAllCourse"],
    }),
    // New endpoint: getAllContent
    getAllContent: builder.query<response, void>({
      query: () => ({
        url: `/getAllContent`,
        method: "GET",
      }),
      providesTags: ["getAllContent"],
    }),
    uploadFile: builder.mutation<response, FormData>({
      query: (formData) => ({
        url: `/upload`,
        method: "POST",
        body: formData,
      }),
    }),
    addCourse: builder.mutation<
      response,
      {
        coverId: string;
        title: string;
        description: string;
        languageId: string;
        rankId: string;
      }
    >({
      query: (body) => ({
        url: `/addCourse`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllCourse"],
    }),
    addContentToCourse: builder.mutation<
      response,
      {
        courseId: string;
        contents: { contentId: string }[];
      }
    >({
      query: (body) => ({
        url: `/addContentToCourse`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllCourse"],
    }),
  }),
});

export const {
  useGetAllCourseQuery,
  usePublishMutation,
  useUnPublishMutation,
  useGetAllRankQuery,
  useGetAllLanguageQuery,
  useUploadFileMutation,
  useAddCourseMutation,
  useAddContentToCourseMutation,
  useGetAllContentQuery, // Exporting the new query hook
} = courseApi;
