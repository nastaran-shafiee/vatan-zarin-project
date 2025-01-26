export type ResponseType<DataType> = {
  result: DataType;
  isSuccess: boolean;
  errors: any[];
  data?: any;
};
export interface PaginateType {
  pageIndex?: number;
  pageSize?: number;
}

export interface LangParams {
  lang?: QueryParamsType;
}

export type ParamsType<T> = PaginateType & LangParams & T;
export type QueryParamsType = string | string[];

export type selectBoxOptionType = {
  text: string;
  value: string;
};

export type paginationDataType = {
  PageIndex?: number;
  PageSize?: number;
};
