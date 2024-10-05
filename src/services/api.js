"use client"
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export  const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/categories`);
  return response.data;
};

export  const fetchProducts = async (category, limit = 10, skip = 0) => {
  const endpoint = category
    ? `${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    : `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
  const response = await axios.get(endpoint);
  return response.data;
};
