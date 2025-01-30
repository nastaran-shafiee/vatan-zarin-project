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
    // Fetch all courses
    getAllCourse: builder.query<response, void>({
      query: () => ({
        url: `/getAllCourse`,
        method: "GET",
      }),
      providesTags: ["getAllCourse"],
    }),

    // Fetch all ranks
    getAllRank: builder.query<response, void>({
      query: () => ({
        url: `/getAllRank`,
        method: "GET",
      }),
      providesTags: ["getAllRank"],
    }),

    // Fetch all languages
    getAllLanguage: builder.query<response, void>({
      query: () => ({
        url: `/getAllLanguage`,
        method: "GET",
      }),
      providesTags: ["getAllLanguage"],
    }),

    // Publish a course
    publish: builder.mutation<responsePublish, CourseIdParamsType>({
      query: ({ courseId }: CourseIdParamsType) => ({
        url: `/${courseId}/publish`,
        method: "POST",
      }),
      invalidatesTags: ["getAllCourse"],
    }),

    // Unpublish a course
    unPublish: builder.mutation<responseUnPublish, CourseIdParamsType>({
      query: ({ courseId }: CourseIdParamsType) => ({
        url: `/${courseId}/unPublish`,
        method: "POST",
      }),
      invalidatesTags: ["getAllCourse"],
    }),

    // Fetch all content
    getAllContent: builder.query<response, void>({
      query: () => ({
        url: `/getAllContent`,
        method: "GET",
      }),
      providesTags: ["getAllContent"],
    }),

    // Upload a file
    uploadFile: builder.mutation<response, FormData>({
      query: (formData) => ({
        url: `/upload`,
        method: "POST",
        body: formData,
      }),
    }),

    // Add a new course
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

    // Add content to a course
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
    // Fetch a specific course by courseId
    getCourseById: builder.query<response, CourseIdParamsType>({
      query: ({ courseId }) => ({
        url: `/getCourseById/${courseId}`, // Adjust this endpoint URL as needed
        method: "GET",
      }),
      providesTags: ["getAllCourse"],
    }),
  // Fetch course content by courseId
  getCourseContentById: builder.query<response, CourseIdParamsType>({
    query: ({ courseId }) => ({
      url: `/${courseId}/getContent`,
      method: "GET",
    }),
    providesTags: ["getAllContent"],
  }),
    // Update course details
    updateCourse: builder.mutation<
      response,
      {
        coverImageAddressId: string;
        demoAddressId: string;
        title: string;
        description: string;
        languageId: string;
        rankId: string;
        courseId: string ;
      }
    >({
      query: (body) => ({
        url: `/update`,
        method: "PUT",
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
  useGetAllContentQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useGetCourseContentByIdQuery
} = courseApi;
