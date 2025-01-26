import { ResponseType } from './Utils';

export type Products = ResponseType<Data>;

export interface Data {
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  pageNumber: number;
  displayMode: string;
  listProducts: ListProduct[];
}

export interface ListProduct {
  idProduct: string;
  comAnb_ID: number;
  productName: string;
  productImage: string;
  point: number;
  brandId: number;
  brandName: string;
  starRating: number;
  starPercentage: number;
  hasAttribute: string;
  anbarName: string;
  category_ID: number;
  isWishList: boolean;
  inventoryCount: number;
  idProductDisplayMode: number;
  percentageDiscount: number;
  qtyShoppingCart: number;
  percentDiscountWithPoints: number;
  pointsAfterDiscount: number;
  price: number;
  priceMarketer: number;
  consumerPrice: number;
  pvPrice: number;
  pvPriceAfterDiscount: number;
  productImageURL: string;
  isStock: boolean;
  useKopen: boolean;
  product_ID?: string;
}

// product compare
export type CompareProduct = ResponseType<Daum[]>;

export interface Daum {
  listOfDetail: ListOfDetail[];
  listOfAttribute: ListOfAttribute[];
  product_ID: string;
}

export interface ListOfDetail {
  idProductDisplayMode: number;
  consumerPrice: number;
  inventoryCount: number;
  percentDiscountWithPoints: number;
  percentageDiscount: number;
  point: number;
  pointsAfterDiscount: number;
  price: number;
  priceMarketer: number;
  productImage: string;
  productName: string;
  pvPrice: number;
  pvPriceAfterDiscount: number;
  starPercentage: number;
  starRating: number;
  comAnb_ID: number;
  kholase: string;
  brandName: string;
  taxRate: number;
  nameCategory: string;
}

export interface ListOfAttribute {
  text: string;
  values: string;
}

export interface SingleProductData {
  isWish: boolean;
  productDetail: ProductDetail;
  attributesList: AttributesListEntity[];
  productAxGalleryList?: string[] | null;
  productCommentList?: ProductCommentListEntity[] | [];
  mostPurchasedByCategoryId: ListProduct[];
  similarProductsList: ListProduct[];
  listAnbar?: ListAnbarEntity[] | null;
  anbarId: string;
  anbarName: string;
  shoppingCartOLTP: shoppingCartOLTPType;
}

export interface ProductDetail {
  idProduct: string;
  productName: string;
  productImage: string;
  point: number;
  percentDiscountWithPoints: number;
  pointsAfterDiscount: number;
  priceMarketer: number;
  price: number;
  consumerPrice: number;
  pvPriceAfterDiscount: number;
  pvPrice: number;
  percentageDiscount: number;
  idProductDisplayMode: number;
  inventoryCount?: number;
  brandName: string;
  brandId: number;
  starRating: number;
  starPercentage: number;
  summaryDescription?: null;
  latinNameProduct: string;
  description: string;
  healthLicense: string;
  commentCount: number;
  articleMats?: null;
  methodOfUse: string;
  isBuild: boolean;
  linkVideo?: null;
  metaKeywords: string;
  idCategory: number;
  categoryName: string;
  useOfBeforeAndAfter?: null;
  useOfBefore?: null;
  useOfAfter?: null;
  idNoeProduct: number;
  productDisplayModeName: string;
  noeProdutName: string;
  limitMaxQty: number;
  allowAddShopingCart?: null;
  defualtAnbarName: string;
}
export interface AttributesListEntity {
  descriptions: string;
  values: string;
}
export interface ProductCommentListEntity {
  firstName: string;
  lastName: string;
  matn: string;
  createDate: string;
}

export interface ListAnbarEntity {
  comAnb_ID: string;
  anB_Name: string;
  selected: boolean;
}
