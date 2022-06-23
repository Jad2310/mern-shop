import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

// Fetch all products
const getProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};


const productService = {
  getProducts,
};

export default productService;
