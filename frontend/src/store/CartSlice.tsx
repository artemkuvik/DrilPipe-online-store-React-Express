import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../types/types";

interface CartState {
    items: CartItemType[];
    totalQuantity: number;
    totalPrice: number;
}

export const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<CartItemType[]>) {
            // Фильтруем записи без product_id (некорректные данные)
            state.items = action.payload.filter(item => item.product_id !== null && item.product_id !== undefined);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + Number(item.price), 0);
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 