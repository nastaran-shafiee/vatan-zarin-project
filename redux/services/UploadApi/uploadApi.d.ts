import {ResponseType} from "#/core/schema/Utils";

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
