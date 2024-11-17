import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutItem {
  dishId: string;
  quantity: number;
  dishOptionSelectionIds: string[];
}

interface CheckoutState {
  addressId: string | null;
  couponId: string | null;
  items: CheckoutItem[];
  note: string;
  paymentMethod: string;
  shippingFee: number;
  userId: string | null;
}

// Định nghĩa state ban đầu
const initialState: CheckoutState = {
  addressId: null,
  couponId: null,
  items: [],
  note: "",
  paymentMethod: "COD",
  shippingFee: 0,
  userId: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddressId: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;
    },
    setCouponId: (state, action: PayloadAction<string | null>) => {
      state.couponId = action.payload;
    },
    addItem: (state, action: PayloadAction<CheckoutItem[]>) => {
      state.items = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setShippingFee: (state, action: PayloadAction<number>) => {
      state.shippingFee = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const {
  setAddressId,
  setCouponId,
  addItem,
  setPaymentMethod,
  setShippingFee,
  setUserId,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
