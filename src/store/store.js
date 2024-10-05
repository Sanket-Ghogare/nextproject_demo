"use client"
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  products: [],
  selectedCategory: '',
  searchQuery: '',
  page: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setProducts(state, action) {
      state.products = [...state.products, ...action.payload];
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.page = 1;
      state.products = [];
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
});

export const {
  setCategories,
  setProducts,
  setSelectedCategory,
  setSearchQuery,
  incrementPage,
} = productSlice.actions;

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

export default store;
