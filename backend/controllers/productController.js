const axios = require('axios');
const API_BASE_URL = 'https://dummyjson.com';

exports.getCategories = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

exports.getProducts = async (req, res) => {
  const { category, limit = 10, skip = 0 } = req.query;

  try {
    const endpoint = category
      ? `${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
      : `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
    const response = await axios.get(endpoint);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};
