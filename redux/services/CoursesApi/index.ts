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
  tagTypes: ["getAllCourse"],
  endpoints: (builder) => ({
    getAllCourse: builder.query<response, void>({
      query: () => ({
        url: `/getAllCourse`,
        method: "GET",
      }),
      providesTags: ["getAllCourse"],
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
  }),
});

export const {
  useGetAllCourseQuery,
  useUnPublishMutation,
  usePublishMutation,
} = courseApi;
