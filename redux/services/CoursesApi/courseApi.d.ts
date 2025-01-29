import { ResponseType } from "#/schema/Utils";

type user = {
  username: string;
  password: string;
};
type getAllCourseParamType = {
  courseId: string;
  title: string;
  coverImageUrl: string;
  ownerName: string;
  state: number;
  isPublish: boolean;
  contentCount: number;
  rankTitle: string;
};
export type CourseIdParamsType = {
  courseId: number;
};

export type uploadFileResponse = ResponseType<{
  id: string;
  externalId: string;
  fileName: string;
  fileType: string;
  fileSizeText: string;
  fileSize: number;
  url: string;
  createData: string;
  documentType: number;
}>;
export interface fileUploadPropsType {
  files?: File[] | null | string;
}

export type response = ResponseType<getAllCourseParamType[]>;
export type responsePublish = ResponseType<>;
export type responseUnPublish = ResponseType<>;
export interface CourseFormData {
  coverId: string;
  title: string;
  description: string;
  languageId: string;
  rankId: string;
}
export interface FormData {
  title: string;
  coverId: string;
  description: string;
  languageId: string;
  rankId: string;
}

export interface AddCoverProps {
  methods: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLanguagesLoading: boolean;
  languages: any;
  isRanksLoading: boolean;
  ranks: any;
  setValue: UseFormSetValue<FormData>;
  errors: any;
  isSubmitting: boolean;
}
