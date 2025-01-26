import { createSlice } from '@reduxjs/toolkit';

export interface shoppingCartItemTypes {
  id: number
  kalaImage: string
  kalaName: string
  idProduct: string
  tedad: number
  gheymatVahed: number
  mablaghKhordeFroushi: number
  darsadTakhfifEmtiaz: number
  darsadTakhfifKala: number
  gheymatKol: number
  mablaghBadAzTakhfif: number
  emtiazVahed: number
  emtiazKol: number
  emtiazBadAzTakhfif: number
  grouhKala: string
  vahedeAndazegiri: string
  taxRate: number
  taxAmount: number
  isKalaKopeni: boolean
  isPack: boolean
  idNoProduct: number
  idKala: string
  isExists: boolean
}
type global = {
  openShoppingCartDrawer: boolean;
  openWareHouseAlert: boolean;
  openWareHouseModal: boolean;
  wareHouseId: number | string | null;
  defaultShippingMethod: number | string | null;
  shoppingCartItems:shoppingCartItemTypes[] | []
};

const initialState = {
  openShoppingCartDrawer: false,
  openWareHouseAlert:false,
  openWareHouseModal: false,
  wareHouseId:null,
  defaultShippingMethod:null,
  shoppingCartItems:[]
} as global;

export const Global = createSlice({
  name: 'global',
  initialState,
  reducers: {
    reset: () => initialState,
    setOpenShoppingCartDrawer: (state, action) => {
      state.openShoppingCartDrawer = action.payload;
    },
    setWareHouseId: (state, action) => {
      state.wareHouseId = action.payload;
    },
    setOpenWareHouseAlert: (state, action) => {
      state.openWareHouseAlert = action.payload;
    },
    setOpenWareHouseModal: (state, action) => {
      state.openWareHouseModal = action.payload;
    },
    setDefaultShippingMethod: (state, action) => {
      state.defaultShippingMethod = action.payload;
    },
    setShoppingCartItems: (state, action) => {
      state.shoppingCartItems = action.payload;
    },
  },
});

export const { reset,
  setOpenShoppingCartDrawer,
  setOpenWareHouseAlert,
  setOpenWareHouseModal,
  setDefaultShippingMethod,
  setShoppingCartItems,
  setWareHouseId } = Global.actions;
export default Global.reducer;
