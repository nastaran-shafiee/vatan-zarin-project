import { ResponseType } from './Utils';
export type BranchItemType = {
  branchId: number;
  englishTitle: string;
  persianTitle: string;
  manager: string;
  name: string;
  tel: string;
  address: string;
  city: string;
  long: number;
  lat: number;
};

export type BranchDetailType = {
  id: number;
  isActive: boolean;
  address: string;
  phone: string;
  city_ID: number;
  codePostiBranch: string;
  long: number;
  lat: number;
  branchName: string;
  branchManager: string;
  urlFilm: string;
};
export type ManagementItemType = NonNullable<unknown>;
export type ManagementDetailType = NonNullable<unknown>;

export type getBranchListResponse = ResponseType<BranchItemType[]>;
export type getBranchDetailResponse = ResponseType<BranchDetailType>;
export type getManagementListResponse = ResponseType<ManagementItemType[]>;
export type getManagementDetailResponse = ResponseType<ManagementDetailType>;
