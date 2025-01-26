import { ResponseType } from './Utils';

export type FilterProducts = ResponseType<Data>;

export interface Data {
  categoryFilter: CategoryFilter;
  brandFilter: BrandFilter;
  anbarFilter: AnbarFilter;
  pricePointFilter: PricePointFilter;
  displayTypeFilter: DisplayTypeFilter;
  useKopen: boolean;
  idAnbar: any;
  q: any;
}

export interface CategoryFilter {
  listCategories: any[];
  listSelected_IdParent: string[];
  listSelected_IdChild_Level2: any[];
  listSelected_IdChild_Level3: any[];
  useKopen: any;
  idAnbar: string;
  q: any;
}

export interface BrandFilter {
  brands: string;
  listBrands: any[];
  useKopen: any;
  idAnbar: string;
  q: any;
}

export interface AnbarFilter {
  listAnbar: ListAnbar[];
  useKopen: any;
  idAnbar: any;
  q: any;
}

export interface ListAnbar {
  value: string;
  text: string;
  selected: boolean;
}

export interface PricePointFilter {
  scoreStart: number;
  scoreEnd: number;
  priceStart: number;
  priceEnd: number;
}

export interface DisplayTypeFilter {
  categoryName: any;
  sort: number;
  pageSize: number;
  item: any;
  title: any;
}
