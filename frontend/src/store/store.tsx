import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.tsx";
import servicesReducer from "./ServicesSlice.tsx";
import productsReducer from "./ProductsSlice.tsx";
import cartReducer from "./CartSlice.tsx";

const store = configureStore({
  reducer: {
    user: userReducer,
    services: servicesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
