import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fileUploadPropsType,
  uploadFileResponse,
} from "#/redux/services/UploadApi/uploadApi";
import prepareHeaders from "#/redux/prepareFileHeaders";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_HOST + "/Courses",
    prepareHeaders: prepareHeaders,
  }),

  endpoints: (builder) => ({
    uploadFile: builder.mutation<uploadFileResponse, fileUploadPropsType>({
      query: (params) => {
        const formData: any = new FormData();
        if (params.files) {
          for (let i = 0; i < params.files?.length; i++) {
            formData.append("file", params.files[i]);
          }
        }
        return {
          url: `/Upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});
export const { useUploadFileMutation } = uploadApi;
