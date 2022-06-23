import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

// Fetch single product
const getProductById = async (id: string) => {
  const response = await axios.get(API_URL + `${id}`);

  return response.data;
};

const productDetailsService = {
  getProductById,
};

export default productDetailsService;
