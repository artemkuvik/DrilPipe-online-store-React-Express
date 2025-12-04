import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import { Category } from "../types/types";


interface ProductState  {
  products: Product[];
  selectedCategory: number | null;
  categories: Category[];
  filters: {
    categoryActive: number | null;
    minPrice: string | number;
    maxPrice: string | number;
    search: string;
  };
};

const initialState: ProductState = {
  products: [],
  categories: [],
  selectedCategory: null,
  filters: {
    categoryActive: null,
    minPrice: "",
    maxPrice: "",
    search: "",
  },
};

const productsSlice = createSlice({ 
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setCategories(state, action) { state.categories = action.payload; },
    setSelectedCategory(state, action: PayloadAction<number>) {
        state.selectedCategory = action.payload;
    },
    setCategoryActive(state, action: PayloadAction<number | null>) {
      state.filters.categoryActive = action.payload;
    },
    setMinPrice(state, action: PayloadAction<string | number>) {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<string | number>) {
      state.filters.maxPrice = action.payload;
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
  },
});

export const { setProducts, setSelectedCategory, setCategories, setCategoryActive, setMinPrice, setMaxPrice, setSearchFilter } = productsSlice.actions;

export default productsSlice.reducer; 
