import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: string;      // e.g. "$189"
  oldPrice: string;
  size: string;
  color: string;      // tailwind gradient class for thumbnail bg
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, "qty"> & { qty?: number }>) {
      const { qty = 1, ...rest } = action.payload;
      const existing = state.items.find(
        (i) => i.id === rest.id && i.size === rest.size
      );
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ ...rest, qty });
      }
    },

    removeItem(state, action: PayloadAction<{ id: number; size: string }>) {
      state.items = state.items.filter(
        (i) => !(i.id === action.payload.id && i.size === action.payload.size)
      );
    },

    updateQty(
      state,
      action: PayloadAction<{ id: number; size: string; qty: number }>
    ) {
      const { id, size, qty } = action.payload;
      if (qty < 1) {
        state.items = state.items.filter(
          (i) => !(i.id === id && i.size === size)
        );
      } else {
        const item = state.items.find((i) => i.id === id && i.size === size);
        if (item) item.qty = qty;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
